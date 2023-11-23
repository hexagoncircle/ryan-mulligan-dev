const unionBy = require("lodash/unionBy");
const fs = require("fs");
const { domain } = require("./meta.js");

require("dotenv").config();

const CACHE_DIR = ".cache";
const API_ORIGIN = "https://webmention.io/api/mentions.jf2";
const TOKEN = process.env.WEBMENTION_IO_TOKEN;

async function fetchWebmentions(since, perPage = 10000) {
  if (!domain) {
    console.warn("> unable to fetch webmentions: no domain name specified");
    return false;
  }

  if (!TOKEN) {
    console.warn("> unable to fetch webmentions: no access token specified in environment.");
    return false;
  }

  let url = `${API_ORIGIN}?domain=${domain}&token=${TOKEN}&sort-dir=up&per-page=${perPage}`;

  if (since) url += `&since=${since}`;

  const response = await fetch(url);

  if (response.ok) {
    const feed = await response.json();
    console.log(`> ${feed.children.length} new webmentions fetched from ${API_ORIGIN}`);
    return feed;
  }

  return null;
}

// Merge fresh webmentions with cached entries, unique per id
function mergeWebmentions(a, b) {
  return unionBy(a.children, b.children, "wm-id");
}

// save combined webmentions in cache file
function writeToCache(data) {
  const filePath = `${CACHE_DIR}/webmentions.json`;
  const fileContent = JSON.stringify(data, null, 2);

  // create cache folder if it doesnt exist already
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }

  // write data to cache json file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    console.log(`> webmentions saved to ${filePath}`);
  });
}

// get cache contents from json file
function readFromCache() {
  const filePath = `${CACHE_DIR}/webmentions.json`;

  if (fs.existsSync(filePath)) {
    console.log("Reading webmentions from cache dir");
    const cacheFile = fs.readFileSync(filePath);
    return JSON.parse(cacheFile);
  }

  // no cache found.
  console.log("No webmentions cache found");

  return {
    lastFetched: null,
    children: [],
  };
}

module.exports = async function () {
  const cache = readFromCache();
  if (cache.children.length) {
    console.log(`> ${cache.children.length} webmentions loaded from cache`);
  }

  // Only fetch new mentions in production
  const feed = await fetchWebmentions(cache.lastFetched);

  if (feed) {
    const webmentions = {
      lastFetched: new Date().toISOString(),
      children: mergeWebmentions(cache, feed),
    };

    writeToCache(webmentions);
    return webmentions;
  }

  return cache;
};

const { domain } = require("../../src/_data/meta.js");

const getWebmentionsByType = (mentions, mentionType) => {
  return mentions.filter((entry) =>
    mentionType.split(", ").includes(entry["wm-property"])
  );
};

const getWebmentionsForUrl = (webmentions, pathname) => {
  const url = `https://${domain}${pathname}`;

  const commentTypes = ["in-reply-to", "mention-of"];

  const hasRequiredFields = (entry) => {
    if (commentTypes.includes(entry["wm-property"])) {
      const { author, published, content } = entry;
      return author.name && published && content;
    }
    return entry;
  };

  const mentions = webmentions.children
    .filter((entry) => entry["wm-target"] === url)
    .filter(hasRequiredFields);

  return mentions;
};

module.exports = {
  getWebmentionsByType,
  getWebmentionsForUrl,
};

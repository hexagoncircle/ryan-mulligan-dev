const sanitizeHTML = require("sanitize-html");

const getWebmentionsByType = (mentions, mentionType) => {
  return mentions.filter((entry) => mentionType.split(", ").includes(entry["wm-property"]));
};

// const getWebmentionsForUrl = (webmentions, url) => {
//   const commentTypes = ["in-reply-to", "mention-of", "like-of", "repose-of"];
//   const allowedHTML = {
//     allowedTags: ["b", "i", "em", "strong"],
//   };

//   const orderByDate = (a, b) => new Date(a.published) - new Date(b.published);

//   const checkRequiredFields = (entry) => {
//     const { author, published, content } = entry;
//     return author.name && published && content;
//   };

//   const sanitizeContent = (entry) => {
//     const { html, text } = entry.content;

//     if (html) {
//       entry.content.value =
//         html.length > 2000 ? `mentioned in entry["wm-source"]` : sanitizeHTML(html, allowedHTML);
//     } else {
//       entry.content.value = sanitizeHTML(text, allowedHTML);
//     }

//     return entry;
//   };

//   return webmentions.children
//     .filter((entry) => entry["wm-target"] === url)
//     .filter((entry) => commentTypes.includes(entry["wm-property"]))
//     .filter(checkRequiredFields)
//     .sort(orderByDate)
//     .map(sanitizeContent);
// };

const getWebmentionsForUrl = (webmentions, url) => {
  const commentTypes = ["in-reply-to", "mention-of"];
  const allowedHTML = {
    allowedTags: ["b", "i", "em", "strong"],
  };

  const orderByDate = (a, b) => new Date(a.published) - new Date(b.published);

  const hasRequiredFields = (entry) => {
    if (commentTypes.includes(entry["wm-property"])) {
      const { author, published, content } = entry;
      return author.name && published && content;
    }
    return entry;
  };

  const sanitizeContent = (entry) => {
    if (!entry.content) return entry;

    const { html, text } = entry.content;

    if (html) {
      entry.content.output =
        html.length > 2000 ? `mentioned in ${entry["wm-source"]}` : sanitizeHTML(html, allowedHTML);
    } else {
      entry.content.output = sanitizeHTML(text, allowedHTML);
    }

    return entry;
  };

  const mentions = webmentions.children
    .filter((entry) => entry["wm-target"] === url)
    .filter(hasRequiredFields)
    .sort(orderByDate)
    .map(sanitizeContent);

  return mentions;
};

module.exports = {
  getWebmentionsByType,
  getWebmentionsForUrl,
};

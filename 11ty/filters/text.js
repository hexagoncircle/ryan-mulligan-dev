const textWrap = (text, index) =>
  `<span style="--index: ${index}" aria-hidden="true">${text}</span>`;

const splitLetters = (text) => [...text].map(textWrap).join("");

const splitWords = (text) => text.split(" ").map(textWrap).join("");

module.exports = {
  splitLetters,
  splitWords,
};

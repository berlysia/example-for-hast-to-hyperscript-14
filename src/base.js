const unified = require("unified");

module.exports = function getProcessor({ createElement }) {
  function hast2h() {
    this.Compiler = hast => {
      return hast2hyperscript(createElement, hast);
    };
  }

  return unified().use(hast2h);
};

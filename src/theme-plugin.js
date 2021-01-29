const path = require('path');

module.exports = () => ({
  name: 'docusaurus-preset-theme',
  getThemePath() {
    return path.join(__dirname, '..', 'lib', 'theme');
  },
  getTypeScriptThemePath() {
    return path.resolve(__dirname, './theme');
  },
});

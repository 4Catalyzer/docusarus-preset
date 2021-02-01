module.exports = (_, options) => ({
  name: 'custom-css',
  getClientModules() {
    return [options.customCss];
  },
});

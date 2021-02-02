module.exports = () => ({
  name: 'resolve-react',
  configureWebpack() {
    return {
      resolve: {
        alias: {
          'react': require.resolve('react'),
          'react-dom$': require.resolve('react-dom'),
          'react-dom/server': require.resolve('react-dom/server'),
        },
      },
    };
  },
});

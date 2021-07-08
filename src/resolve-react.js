module.exports = () => ({
  name: 'resolve-react',
  configureWebpack() {
    let runtimes;
    try {
      runtimes = {
        'react/jsx-runtime': require.resolve('react/jsx-runtime'),
        'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
      };
    } catch (e) {
      runtimes = {};
    }

    return {
      resolve: {
        alias: {
          'react$': require.resolve('react'),
          ...runtimes,
          'react-dom$': require.resolve('react-dom'),
          'react-dom/server': require.resolve('react-dom/server'),
        },
      },
    };
  },
});

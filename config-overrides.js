const webpack = require('webpack');
const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = function override(config) {
  // Existing code
  config.resolve.fallback = {
    process: require.resolve('process/browser'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer')
  };

  // Increase cache size limit
  config.plugins.forEach((plugin) => {
    if (plugin instanceof WorkBoxPlugin.InjectManifest) {
      plugin.config.maximumFileSizeToCacheInBytes = 50 * 1024 * 1024;
    }
  });

  // Add ProvidePlugin for process and Buffer
  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer']
    })
  ];

  // Add exclusion for @mediapipe source maps
  const sourceMapLoaderRule = config.module.rules.find((rule) => rule.loader && rule.loader.includes('source-map-loader'));

  if (sourceMapLoaderRule) {
    sourceMapLoaderRule.exclude = [/@mediapipe/]; // Exclude @mediapipe folder
  }

  return config;
};

module.exports = {
  plugins: [
    'removeDimensions',
    {
      name: 'removeAttrs',
      params: {
        attrs: ['fill'],
      },
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          // disable a default plugin
          removeViewBox: false,

          // customize the params of a default plugin
          inlineStyles: {
            onlyMatchedOnce: false,
          },
        },
      },
    },
  ],
};

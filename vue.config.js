module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
  },

  css: {
    sourceMap: true
  },

  outputDir: '/dist',
  assetsDir: '/assets'
}
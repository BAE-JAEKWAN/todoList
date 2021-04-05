module.exports = {
  outputDir: '/dist',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = 'source-map'
    }
  },
  css: {
    sourceMap: true
  }
}
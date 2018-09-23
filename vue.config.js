module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Icons: require('path').resolve(__dirname, 'src/assets/icons/')
      }
    }
  }
}
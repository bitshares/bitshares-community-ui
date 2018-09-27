module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@icons': require('path').resolve(__dirname, 'src/assets/icons/')
      }
    }
  },
  baseUrl: './'
}

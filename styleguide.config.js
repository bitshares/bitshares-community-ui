module.exports = {
  // set your styleguidist configuration here
  title: 'Default Style Guide',
  components: 'src/components/**/[A-Z]*.vue',
  require: [require('path').join(__dirname, 'src/directives/index.js')]
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // }
}

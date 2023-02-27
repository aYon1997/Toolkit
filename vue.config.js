const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    proxy: {

    },
    chainWebpack: config => {
      config
      .plugin('html')
      .tap(args => {
          args[0].title = '你的标题'
          return args
      })},
  }
})

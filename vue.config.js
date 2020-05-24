const path = require('path');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: {
        app: {
            // page 的入口
            entry: 'src/main.js',
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'app']
        }
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
              'vue$': 'vue/dist/vue.esm.js',
              '@': resolve('src'),
              '@modules': resolve('src/modules'),
              '@configs': resolve('src/configs'),
              '@globals': resolve('src/globals'),
              '@vendors': resolve('src/vendors'),
              '@assets': resolve('src/assets'),
              'vue-design-core': resolve('src/core'),
            }
        }
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:3000/api',
            ws: true,
            changeOrigin: true
          }
        }
    }
};

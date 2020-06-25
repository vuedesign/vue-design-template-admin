# vue-design-template-admin
业务后台模版

### 依赖相关框架与库

- [vue](https://vuejs.org/)
- [vuex](https://vuex.vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [axios](https://github.com/axios/axios)
- [cookies](https://github.com/js-cookie/js-cookie)
- [vue-cli](https://cli.vuejs.org/)
- [vue-design-mock](https://github.com/vuedesign/vue-design-mock)

### 安装与使用

#### 下载
```bash
git clone git@github.com:vuedesign/vue-design-template-admin.git
```

#### 安装依赖
```bash
# 进入当前目录
cd vue-design-template-admin
# 安装package.json依赖
npm install
```

#### 安装 mock 与 vue-cli

```bash
# window
npm install vue-design-mock -g
npm install vue-cli -g
# mac
sudo npm install vue-design-mock -g
sudo npm install vue-cli -g
```

#### 配置
- vue.config.js

```js
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
            template: 'index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'vue-design-template-admin',
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
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'   //重写接口
                }
            }
        }
    }
};
```

#### 启动
```bash
# 启动 mock
npm run mock
# 启动项目
npm run serve
```

### api

##### core `vue-design-core`
```js
import { 
    store, // 状态上下文对象，与this.$store一样
    router, // 路由上下文对象，与this.$router一样
    http, // 路由上下文对象，与this.$http一样
    createApp // vue实例
} from 'vue-design-core';
```
入口使用 main.js
```js
# main.js
import { createApp } from 'vue-design-core';

createApp();
```

##### 拦截器 `vue-design-core/lib/interceptors`
```js
import { store } from 'vue-design-core';
import { SUCCESS_STATUS_CODE } from './constants';
import {
    onGlobalConfig,
    onHttpRequestSuccess,
    onHttpRequestFailure,
    onHttpResponseSuccess,
    onHttpResponseFailure,
    onRouterBeforeEach,
    onRouterAfterEach,
    onRouterBeforeResolve
} from 'vue-design-core/lib/interceptors';

// 拦截器配置
onGlobalConfig(config => {
    // 时间戳注入开关
    config.isTimestampDisabled = false;
});

// 请求成功
onHttpRequestSuccess(config => config);

// 请求失败
onHttpRequestFailure(error => Promise.reject(error));

// 返回成功
onHttpResponseSuccess((response) => {
    if (response.status === SUCCESS_STATUS_CODE) {
        return response.data;
    }
    return Promise.reject(response);
});

// 返回失败
onHttpResponseFailure(error => Promise.reject(error));

// 路由进入之前
onRouterBeforeEach(({ to, next }) => {
    store.commit('common/SEO_TITLE', to);
    next();
});

// 路由进入之后
onRouterAfterEach(() => {});

onRouterBeforeResolve(({ next }) => {
    next();
});
```
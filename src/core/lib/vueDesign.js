import Vue from 'vue';
import 'normalize.css';
import '../assets/styles/reset.css';
import { config } from './configs';
import vueDesignRouter from './router';
import vueDesignStore from './store';
import vueDesignHttp from './http';
import interceptors from './interceptors';
import vendors from './vendors';
import components from './components';
import cookies from './plugins/cookies';
import { rootRoutes, modules } from './modules';
import App from '@/App';

vendors(Vue);
components(Vue);

Vue.use(cookies);

config('interceptors.js');

export const router = vueDesignRouter(Vue, {
    rootRoutes,
    interceptors
});

export const store = vueDesignStore(Vue, {
    modules
});

export const http = vueDesignHttp(Vue, {
    interceptors
});

// 实例配置
const defaultOptions = {
    router,
    store,
    render: h => h(App)
};

export const createApp = (el = '#app', options = {}) => {
    Object.assign(defaultOptions, options)
    return new Vue(defaultOptions).$mount(el);
};

export {
    App
};

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

const router = vueDesignRouter(Vue, {
    rootRoutes,
    interceptors
});

const store = vueDesignStore(Vue, {
    modules
});

const http = vueDesignHttp(Vue, {
    interceptors
});

// 实例配置
const defaultOptions = {
    router,
    store,
    render: h => h(App)
};

// 继承Vue
class VueDesign extends Vue {
    constructor(options = {}) {
        super(Object.assign(defaultOptions, options));
    }
}

export {
    router,
    store,
    http,
    App
}

export default VueDesign;

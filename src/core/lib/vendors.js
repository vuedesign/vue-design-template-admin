import { config } from './configs';

const vendorContextVue = require.context('@vendors', true, /\.vue$/);
const vendorContextJs = require.context('@vendors', true, /^\.\/([a-zA-Z0-9_-]*)\/(([a-zA-Z0-9_-]*)\.js|([a-zA-Z0-9_-]*)\/([a-zA-Z0-9_-]*)\.js)$/);

const vendorCacheJs = getCache(vendorContextJs);
const plugins = config('plugins.js') || {};

function getCache(context) {
    let cache = {};
    context.keys().forEach(key => {
        const [, moduleName, fileName] = key.split('/');
        if (!cache[moduleName]) {
            cache[moduleName] = {
                [fileName]: context(key)
            };
        }  else {
            cache[moduleName][fileName] = context(key);
        }
    });
    return cache;
}

export default function vendors(Vue) {
    vendorContextVue.keys().forEach(key => {
        const c = vendorContextVue(key).default;
        Vue.component(c.name, c);
    });
    Object.keys(vendorCacheJs).forEach(key => {
        const item = vendorCacheJs[key];
        switch(key) {
            case 'UIComponents':
                Vue.use(item['index.js'].default, plugins[key]);
                break;
            case 'directives':
                setDirectives(Vue, item);
                break;
            case 'filters': 
                setFilters(Vue, item);
                break;
            case 'mixin': 
                Vue.mixin(item['index.js'].default);
                break;
            case 'plugins': 
                setPlugins(Vue, item, plugins[key]);
                break;
        }
    });
}

/*
function setComponents(Vue, components) {
    Object.keys(components).forEach(key => {
        const c = components[key].default;
        Vue.component(c.name, c);
    });
}
*/

function setDirectives(Vue, cacheDirectives) {
    const directives = cacheDirectives['index.js'].default;
    Object.keys(directives).forEach(key => {
        Vue.directive(key, directives[key]);
    });
}

function setFilters(Vue, cacheFilters) {
    const filters = cacheFilters['index.js'].default;
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key]);
    });
}

function setPlugins(Vue, cachePlugins, options = {}) {
    Object.keys(cachePlugins).forEach(key => {
        Vue.use(cachePlugins[key].default, options);
    });
}
 
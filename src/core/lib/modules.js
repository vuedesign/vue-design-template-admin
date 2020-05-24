import { getCache } from './utils';
import { config } from './configs';

const globalContext = require.context('@globals', true, /^\.\/([a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js|index\.js)$/);
const moduleContext = require.context('@modules', true, /^\.\/([a-zA-Z0-9_-]*|[a-zA-Z0-9_-]*\/children\/[a-zA-Z0-9_-]*)\/(config\.json|routes\.js|store\.js|index\.js)$/);

const getCurrentRouteName = (defaultModuleRouter = 'entry') => {
    const globalsConfig = config('globals.js');
    return globalsConfig.moduleRouter || defaultModuleRouter;
}

const globalCache = getCache(globalContext);
const moduleCache = getCache(moduleContext);

const rootRoutes = [];
const childrenRoutes = [];
const modules = {};
const globalComponents = {};
const getRouteConfig = (routesJs) => {
    if (!routesJs) {
        return [];
    }
    return routesJs.default;
};

// 公共模块
Object.keys(globalCache).forEach(key => {
    const globalFiles = globalCache[key];
    const routesJs = globalFiles['routes.js'];
    const configJson = globalFiles['config.json'];
    const storeJs = globalFiles['store.js'];
    const indexJs = globalFiles['index.js'];
    // 没有路由，这是一个组件
    if (!routesJs && indexJs) {
        globalComponents[key] = indexJs;
    }
    if (routesJs) {
        const routeConfig = getRouteConfig(routesJs);
        if (!configJson || configJson.root === undefined || configJson.root) {
            rootRoutes.push(...getRouteConfigs(routeConfig));
        } else {
            childrenRoutes.push(...getRouteConfigs(routeConfig));
        }
    }

    modules[key] = storeJs && storeJs.default || {};
});

// 模块
Object.keys(moduleCache).forEach(key => {
    const globalFiles = moduleCache[key];
    const routesJs = globalFiles['routes.js'];
    const configJson = globalFiles['config.json'];
    const storeJs = globalFiles['store.js'];
    const indexJs = globalFiles['index.js'];
    const children = globalFiles['children'];

    // 没有路由，这是一个组件
    if (!routesJs && indexJs) {
        globalComponents[key] = indexJs;
    }
    if (routesJs) {
        const routeConfig = getRouteConfig(routesJs);
        if (children) {
            routeConfig[0]['children'] = getChildrenRoute(children);
        }
        if (!configJson || configJson.root === undefined || !configJson.root) {
            childrenRoutes.push(...getRouteConfigs(routeConfig));
        } else {
            rootRoutes.push(...getRouteConfigs(routeConfig));
        }
    }

    if (!storeJs) {
        modules[key] = {};
    } else {
        modules[key] = storeJs.default;
        if (children && modules[key]) {
            modules[key]['modules'] = getChildrenStore(children);
        }
    }
});

function getChildrenRoute(children) {
    let routes = [];
    Object.keys(children).forEach(key => {
        const route = children[key]['routes.js'];
        if (route) {
            routes.push(...route.default);
        }
    });
    return routes;
}

function getChildrenStore(children) {
    let stores = {};
    Object.keys(children).forEach(key => {
        const store = children[key]['store.js'];
        if (store) {
            stores[key] = store.default;
        }
    });
    return stores;
}

const currentRouteName = getCurrentRouteName();
const currentRoutes = rootRoutes.find(item => item.name === currentRouteName);

if (currentRoutes && currentRoutes.children) {
    currentRoutes.children = childrenRoutes;
}

function getRouteConfigs(routeConfig) {
    if (Array.isArray(routeConfig)) {
        return routeConfig;
    }
    return [routeConfig];
}

export {
    rootRoutes,
    modules,
    globalComponents
};

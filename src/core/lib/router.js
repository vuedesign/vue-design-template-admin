import Router from 'vue-router';
import { config } from './configs';

export default function vueDesignRouter(Vue, options = {}) {
    const { rootRoutes, interceptors } = options;

    const originalPush = Router.prototype.push
    Router.prototype.push = function push(location) {
        return originalPush.call(this, location).catch(err => err)
    }

    Vue.use(Router);

    const router = new Router({
        mode: config('globals.js').routerMode || 'history',
        routes: [
            ...rootRoutes,
            ...config('routes.js')
        ]
    });

    router.beforeEach((to, from, next) => {
        if (interceptors.routerBeforeEach) {
            interceptors.routerBeforeEach({ to, from, next });
        } else {
            next();
        }
    });

    router.beforeResolve((to, from, next) => {
        if (interceptors.routerBeforeResolve) {
            interceptors.routerBeforeResolve({ to, from, next });
        } else {
            next();
        }
    });

    router.afterEach((to, from) => {
        if (interceptors.routerAfterEach) {
            interceptors.routerAfterEach({ to, from });
        }
    });

    return router;
}

/**
 * Created by wujian on 2018/3/18.
 */
import Vuex from 'vuex';

export default function vueDesignStore(Vue, options = {}) {

    Vue.use(Vuex);

    const {
        modules,
        state = {}, 
        mutations = {},
        getters = {}
    } = options;

    return new Vuex.Store({
        namespace: true,
        state,
        mutations,
        getters,
        modules
    });
}

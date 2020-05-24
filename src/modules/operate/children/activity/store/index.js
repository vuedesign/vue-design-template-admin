/**
 * Created by wujian on 2018/3/18.
 */

import state from './state';
import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

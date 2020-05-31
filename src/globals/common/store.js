
import * as types from './types';
import { config } from 'vue-design-core';

const { BRAND_TITLE } = config('constants.js');

const state = {
    brandTitle: BRAND_TITLE
};

const actions = {};

const mutations = {
    [types.SEO_TITLE](state, to) {
        const { label } = to.meta;
        document.title = `${state.brandTitle}-${label}`;
    }
};

const getters = {};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

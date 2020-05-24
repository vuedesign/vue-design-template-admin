import { to } from 'vue-design-core';
import * as api from './api';

const types = {
    DATA: 'DATA',
    FILTERS: 'FILTERS',
    TOTAL: 'TOTAL',
    LOADING: 'LOADING'
};

const state = {
    show: false,
    title: '',
    filters: {
        search: ''
    },
    data: [],
    total: 0,
    loading: false
};

const actions = {
    find: async({ commit }) => {
        commit(types.LOADING, true);
        const [err, res] = await to(api.find());
        if (err) {
            return;
        }
        console.log('res *** ', res);
        commit(types.DATA, res.list);
        commit(types.TOTAL, res.total);
        commit(types.LOADING, false);
    },
    findOne: async({ commit }, params) => {
        const [err, res] = await to(api.findById(params));
        if (err) {
            return;
        }
        commit(types.DATA, res.data);
    }
};

const mutations = {
    [types.DATA](state, { key, value }) {
        state[key] = value;
    },
    [types.FILTERS](state, filters) {
        state.filters = Object.assign(state.filters, filters);
    },
    [types.DATA](state, data) {
        state.data = data;
    },
    [types.TOTAL](state, data) {
        state.total = data;
    },
    [types.LOADING](state, data) {
        state.loading = data;
    }
};

const getters = {
    filters: state => state.filters,
    columns: state => state.columns,
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

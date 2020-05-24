import { to } from 'vue-design-core';
import * as api from './api';

const types = {
    DATA: 'DATA',
    FILTERS: 'FILTERS',
    TOTAL: 'TOTAL',
    LOADING: 'LOADING',
    DETAIL: 'DETAIL'
};

const state = {
    show: false,
    title: '',
    filters: {
        name: '',
        type: -1
    },
    data: [],
    detail: {},
    total: 0,
    loading: false
};

const actions = {
    find: async({ commit }, params) => {
        commit(types.LOADING, true);
        const [err, res] = await to(api.find(params));
        if (err) {
            return;
        }
        commit(types.DATA, res.list);
        commit(types.TOTAL, res.list.length);
        commit(types.LOADING, false);
    },
    findOne: async({ commit }, { groupId }) => {
        const [err, detail] = await to(api.findById(groupId));
        if (err) {
            return;
        }
        commit(types.DETAIL, detail);
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
    },
    [types.DETAIL](state, data) {
        state.detail = data;
    }
};

const getters = {
    filters: state => state.filters,
    data: state => state.data,
    total: state => state.total,
    loading: state => state.loading,
    detail: state => state.detail
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

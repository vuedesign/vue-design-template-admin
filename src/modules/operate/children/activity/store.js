import * as types from './types';
import * as api from './api';

const state = {
    filters: {
        region: -1,
        name: '',
        page: 1,
        size: 20
    },
    list: [],
    item: {},
    total: 0,
    loading: false
};

const find = async({ commit, getters }) => {
    const params = getters.filters;
    commit(types.LOADING, true);
    const res = await api.find(params);
    commit(types.LIST, res.list);
    commit(types.TOTAL, res.pagination.total);
    commit(types.LOADING, false);
};

const findOne = async({ commit }, id) => {
    const res = await api.findOne(id);
    commit(types.ITEM, res);
};

const create = async({ dispatch }, data = {}) => {
    await api.create(data);
    dispatch('find');
};

const update = async({ dispatch }, data = {}) => {
    const { id } = data;
    delete data.id;
    await api.update(id, data);
    dispatch('find');
};

const destroy = async({ dispatch }, id) => {
    await api.destroy(id);
    dispatch('find');
};

const updateOne = async({ commit, dispatch }, data) => {
    const { id } = data;
    delete data.id;
    await api.updateOne(id, data);
    dispatch('find');
};

const actions = {
    find,
    findOne,
    create,
    update,
    destroy,
    updateOne
};

const mutations = {
    [types.LIST](state, { key, value }) {
        state[key] = value;
    },
    [types.FILTERS](state, filters) {
        state.filters = Object.assign(state.filters, filters);
    },
    [types.LIST](state, list) {
        state.list = list;
    },
    [types.ITEM](state, item) {
        state.item = item;
    },
    [types.TOTAL](state, total) {
        state.total = total;
    },
    [types.LOADING](state, loading) {
        state.loading = loading;
    }
};

const getters = {
    filters: state => state.filters,
    list: state => state.list,
    item: state => state.item,
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

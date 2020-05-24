/**
 * Created by wujian on 2018/3/18.
 */
// import Vue from 'vue';
import * as types from './types';
import * as api from '../api';
import { to } from '@/vued';
import { SUCCESS_STATUS_CODE } from '@/configs/constants';

export const find = async({ commit, getters }) => {
    const params = getters.filters;
    commit(types.LOADING, true);
    const [err, res] = await to(api.find(params));
    if (err) {
        return;
    }
    console.log('res', res);
    commit(types.LIST, res.list);
    commit(types.TOTAL, res.pagination.total);
    commit(types.LOADING, false);
};

export const findOne = async({ commit }, id) => {
    const [err, res] = await to(api.findOne(id));
    if (err) {
        return;
    }
    commit(types.ITEM, res.data);
};

export const create = async({ commit, dispatch }, data = {}) => {
    const [err, res] = await to(api.create(data));
    if (err) {
        return;
    }
    if (res.code === SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const update = async({ commit, dispatch }, data = {}) => {
    const { id } = data;
    delete data.id;
    const [err, res] = await to(api.update(id, data));
    if (err) {
        return;
    }
    if (res.code === SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const destroy = async({ commit, dispatch }, id) => {
    const [err, res] = await to(api.destroy(id));
    if (err) {
        return;
    }
    if (res.code === SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

export const updateOne = async({ commit, dispatch }, data) => {
    const { id } = data;
    delete data.id;
    const [err, res] = await to(api.updateOne(id, data));
    if (err) {
        return;
    }
    if (res.code === SUCCESS_STATUS_CODE) {
        dispatch('find');
    }
};

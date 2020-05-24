
// import Vue from 'vue';
import { config } from 'vue-design-core';
import { list2tree } from '@vendors/utils';
import * as types from './types';

const state = {
    branchTitle: 'VueDesign',
    asideMenu: [],
    permission: [],
    actions: [],
    asideActive: ''
};

const actions = {
    findMenu: ({ commit }) => new Promise((resolve) => {
        const menuAsideData = config('menuAside.json');
        commit(types.ASIDE_MENU, menuAsideData);
        resolve(menuAsideData);
    }),
    permission: ({ commit }) => new Promise((resolve) => {
        setTimeout(() => {
            const permissionData = config('permission.json');
            const menuAsideData = list2tree(permissionData);
            commit(types.ASIDE_MENU, menuAsideData);
            resolve();
        }, 100);
    })
};

const mutations = {
    [types.ASIDE_MENU](state, asideMenu) {
        state.asideMenu = asideMenu;
    },
    [types.PERMISSION](state, permission) {
        state.permission = permission;
    },
    [types.ACTIONS](state, actions) {
        state.actions = actions;
    },
    [types.ASIDE_ACTIVE](state, asideActive) {
        state.asideActive = asideActive;
    },
    [types.SEO_TITLE](state, to) {
        const { label } = to.meta;
        document.title = `${state.branchTitle}-${label}`;
    }
};

const getters = {
    menu: state => state.menu,
    asideMenu: state => state.asideMenu,
    headerMenuActive: state => state.headerMenuActive,
    actions: state => state.actions,
    asideActive: state => state.asideActive
};

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};

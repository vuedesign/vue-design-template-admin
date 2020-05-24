import { store } from 'vue-design-core';
import { SUCCESS_STATUS_CODE } from './constants';

// let token = 'VHJK324567YU345667POIU';
export const isTimestampDisabled = false;

/**
 * ajax请求成功
 * @param config
 * @returns {*}
 */
export const ajaxRequestSuccess = (config) => {
    console.log('config', config);
    return config;
};

/**
 * ajax请求失败
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxRequestFailure = error => Promise.reject(error);

/**
 * ajax返回成功
 * @param response
 * @returns {*}
 */
export const ajaxResponseSuccess = (response) => {
    if (response.status === SUCCESS_STATUS_CODE) {
        return response.data;
    }
    return Promise.reject(response);
};

/**
 * ajax返回失败
 * @param error
 * @returns {Promise<never>}
 */
export const ajaxResponseFailure = error => Promise.reject(error);

/**
 * @param { to, from, next } param
 */
export const routerBeforeEach = ({ to, next }) => {
    store.commit('admin/SEO_TITLE', to);
    next();
};

export const routerBeforeResolve = ({ next }) => {
    next();
};

export const routerAfterEach = () => {};

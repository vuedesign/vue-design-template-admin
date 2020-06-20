import { store } from 'vue-design-core';
import { SUCCESS_STATUS_CODE } from './constants';
import {
    onGlobalConfig,
    onHttpRequestSuccess,
    onHttpRequestFailure,
    onHttpResponseSuccess,
    onHttpResponseFailure,
    onRouterBeforeEach,
    onRouterAfterEach,
    onRouterBeforeResolve
} from 'vue-design-core/lib/interceptors';

// 拦截器配置
onGlobalConfig(config => {
    // 时间戳注入开关
    config.isTimestampDisabled = false;
});

// 请求成功
onHttpRequestSuccess(config => config);

// 请求失败
onHttpRequestFailure(error => Promise.reject(error));

// 返回成功
onHttpResponseSuccess((response) => {
    if (response.status === SUCCESS_STATUS_CODE) {
        return response.data;
    }
    return Promise.reject(response);
});

// 返回失败
onHttpResponseFailure(error => Promise.reject(error));

// 路由进入之前
onRouterBeforeEach(({ to, next }) => {
    store.commit('common/SEO_TITLE', to);
    next();
});

// 路由进入之后
onRouterAfterEach(() => {});

onRouterBeforeResolve(({ next }) => {
    next();
});

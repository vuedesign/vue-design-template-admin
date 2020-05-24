/**
 * Created by n.see on 2018/10/25.
 */
import axios from 'axios';

export default function vueDesignHttp(Vue, options = {}) {
    const {
        baseURL = '',
        interceptors = {}
    } = options;

    const instance = axios.create({
        baseURL
    });

    instance.interceptors.request.use(config => {
        // 在 interceptors.js 关闭时间戳注入
        // export const isTimestampDisabled = false;
        if (!interceptors.isTimestampDisabled) {
            injectionTimestamp(config);
        }
        if (interceptors.ajaxRequestSuccess) {
            return interceptors.ajaxRequestSuccess(config);
        }
        return config;
    }, error => {
        if (interceptors.ajaxRequestFailure) {
            return interceptors.ajaxRequestFailure(error);
        }
        return Promise.reject(error);
    });

    instance.interceptors.response.use(response => {
        if (interceptors.ajaxResponseSuccess) {
            return interceptors.ajaxResponseSuccess(response.data);
        }
        return response.data;
    }, error => {
        if (interceptors.ajaxResponseFailure) {
            return interceptors.ajaxResponseFailure(error);
        }
        return Promise.reject(error);
    });

    Vue.prototype.$http = instance;
    Vue.http = instance;

    return instance;
}

/**
 * 在api请求时注入时间戳
 * @param config
 */
function injectionTimestamp(config) {
    const timestamp = new Date().getTime();
    if (config.params) {
        config.params = Object.assign({}, config.params, {
            timestamp
        });
    } else {
        config.params = {
            timestamp
        };
    }
}

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
        // if (interceptors.httpRequestSuccess) {
        //     interceptors.httpRequestSuccess(config);
        // }
        return config;
    }, error => {
        if (interceptors.httpRequestFailure) {
            return interceptors.httpRequestFailure(error);
        }
        return Promise.reject(error);
    });

    const success = response => {
        console.log('response', response);
        if (interceptors.httpResponseSuccess) {
            return interceptors.httpResponseSuccess(response.data);
        }
        return response.data;
    };
    const error = error => {
        if (interceptors.httpResponseFailure) {
            return interceptors.httpResponseFailure(error);
        }
        return Promise.reject(error);
    };
    instance.interceptors.response.use(success, error);

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
    const { params = {} } = config;
    Object.assign(params, {
        timestamp
    });
}

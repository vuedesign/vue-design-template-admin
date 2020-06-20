let interceptors = {
    isTimestampDisabled: false
};

export const onHttpRequestSuccess = (fn) => {
    interceptors['httpRequestSuccess'] = (config) => {
        return fn && fn(config);
    };
};

export const onHttpRequestFailure = (fn) => {
    interceptors['httpRequestFailure'] = (config) => {
        return fn && fn(config);
    };
};

export const onHttpResponseSuccess = (fn) => {
    interceptors['httpResponseSuccess'] = (res) => {
        return fn && fn(res);
    };
};

export const onHttpResponseFailure = (fn) => {
    interceptors['httpResponseFailure'] = (err) => {
        return fn && fn(err);
    };
};

export const onRouterBeforeEach = (fn) => {
    interceptors['routerBeforeEach'] = (options) => {
        return fn && fn(options);
    };
};

export const onRouterAfterEach = (fn) => {
    interceptors['routerAfterEach'] = (options) => {
        return fn && fn(options);
    };
};

export const onRouterBeforeResolve = (fn) => {
    interceptors['routerBeforeResolve'] = (options) => {
        return fn && fn(options);
    };
};

export const onGlobalConfig = (fn) => {
    fn && fn(interceptors);
};

export default interceptors;

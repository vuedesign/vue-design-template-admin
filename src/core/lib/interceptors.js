let interceptors = {
    isTimestampDisabled: false
};

export const onHttpRequestSuccess = fn => {
    interceptors.httpRequestSuccess = config => fn ? fn(config) : config;
};

export const onHttpRequestFailure = fn => {
    interceptors.httpRequestFailure = error => fn ? fn(error) : error;
};

export const onHttpResponseSuccess = fn => {
    interceptors.httpResponseSuccess = res => fn ? fn(res) : res;
};

export const onHttpResponseFailure = fn => {
    interceptors.httpResponseFailure = error => fn ? fn(error) : error;
};

export const onRouterBeforeEach = fn => {
    interceptors.routerBeforeEach = options => fn ? fn(options) : options;
};

export const onRouterAfterEach = fn => {
    interceptors.routerAfterEach = options => fn ? fn(options) : options;
};

export const onRouterBeforeResolve = fn => {
    interceptors.routerBeforeResolve = options => fn ? fn(options) : options;
};

export const onGlobalConfig = fn => {
    fn && fn(interceptors);
};

export default interceptors;

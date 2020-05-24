import cookies from 'js-cookie';

const install = (Vue) => {
    Vue.cookies = cookies;
    Vue.prototype.$cookies = cookies;
};

export default {
    install
};

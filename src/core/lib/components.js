import { globalComponents } from './modules';

export default function components(Vue) {
    Object.keys(globalComponents).forEach(key => {
        const component = globalComponents[key].default;
        Vue.component(key, component);
    });
}

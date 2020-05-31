export default [
    {
        path: '/',
        name: 'admin',
        meta: {
            label: '首页'
        },
        redirect: {
            name: 'dashboard'
        },
        component: () => import(/* webpackChunkName: "admin" */'./pages/Index'),
        children: []
    }
];

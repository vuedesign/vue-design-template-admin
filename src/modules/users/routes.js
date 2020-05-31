/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'users',
    name: 'users',
    meta: {
        label: '用户中心'
    },
    component: () => import(/* webpackChunkName: "users" */'./pages/Index'),
    redirect: 'users/user',
    children: []
};

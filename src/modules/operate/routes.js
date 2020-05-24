/**
 * Created by wujian on 2018/3/18.
 */

export default {
    path: 'operate',
    name: 'operate',
    meta: {
        label: '用户运营'
    },
    component: () => import('./pages/Index'),
    redirect: 'operate/activity',
    children: []
};

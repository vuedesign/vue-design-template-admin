export default [
    {
        path: 'activity/:page',
        name: 'operate-activity',
        meta: {
            label: '用户'
        },
        component: () => import(/* webpackChunkName: "operate" */'./pages/Index'),
        children: [
            {
                path: 'add',
                name: 'operate-activity-add',
                meta: {
                    label: '新增用户'
                },
                component: () => import(/* webpackChunkName: "operate" */'./pages/Add')
            },
            {
                path: 'edit/:id',
                name: 'operate-activity-edit',
                meta: {
                    label: '编辑用户'
                },
                component: () => import(/* webpackChunkName: "operate" */'./pages/Edit')
            },
            {
                path: 'view/:id',
                name: 'operate-activity-view',
                meta: {
                    label: '编辑用户'
                },
                component: () => import(/* webpackChunkName: "operate" */'./pages/View')
            }
        ]
    }
];

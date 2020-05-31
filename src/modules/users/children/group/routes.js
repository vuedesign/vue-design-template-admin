export default [
    {
        path: 'group/:page',
        name: 'users-group',
        meta: {
            label: '用户组'
        },
        component: () => import(/* webpackChunkName: "users" */'./pages/Index'),
        children: [
            {
                path: 'add',
                name: 'users-group-add',
                meta: {
                    label: '新增用户'
                },
                component: () => import(/* webpackChunkName: "users" */'./pages/Add')
            },
            {
                path: 'edit/:id',
                name: 'users-group-edit',
                meta: {
                    label: '编辑用户'
                },
                component: () => import(/* webpackChunkName: "users" */'./pages/Edit')
            },
            {
                path: 'view/:id',
                name: 'users-group-view',
                meta: {
                    label: '编辑用户'
                },
                component: () => import(/* webpackChunkName: "users" */'./pages/View')
            }
        ]
    }
];

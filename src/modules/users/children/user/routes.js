export default [
    {
        path: 'user/:page',
        name: 'users-user',
        meta: {
            label: '用户'
        },
        component: () => import('./pages/Index'),
        children: [
            {
                path: 'add',
                name: 'users-user-add',
                meta: {
                    label: '新增用户'
                },
                component: () => import('./pages/Add')
            },
            {
                path: 'edit/:id',
                name: 'users-user-edit',
                meta: {
                    label: '编辑用户'
                },
                component: () => import('./pages/Edit')
            },
            {
                path: 'view/:id',
                name: 'users-user-view',
                meta: {
                    label: '编辑用户'
                },
                component: () => import('./pages/View')
            }
        ]
    }
];

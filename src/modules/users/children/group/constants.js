import { list2map } from '@vendors/utils';

export const typeList = [
    {
        label: '全部',
        value: -1
    },
    {
        label: '超级管理员',
        value: 1
    },
    {
        label: '管理员',
        value: 2
    }
];

export const typeMap = list2map(typeList);

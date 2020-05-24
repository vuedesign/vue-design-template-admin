import { list2map } from '@vendors/utils';

export const rules = {
    thumb: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    name: [
        { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    region: [
        { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date: [
        { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
    ],
    time: [
        { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
    ],
    type: [
        { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
    ],
    resource: [
        { required: true, message: '请选择活动资源', trigger: 'change' }
    ],
    desc: [
        { required: true, message: '请填写活动形式', trigger: 'blur' }
    ]
};

export const regionList = [
    {
        label: '全部',
        value: -1
    },
    {
        label: '区域一',
        value: 1
    },
    {
        label: '区域二',
        value: 2
    },
    {
        label: '区域三',
        value: 3
    }
];
export const regionMap = list2map(regionList);

export const typeList = [
    {
        label: '美食/餐厅线上活动',
        key: 1
    },
    {
        label: '地推活动',
        key: 2
    },
    {
        label: '线下主题活动',
        key: 3
    },
    {
        label: '单纯品牌曝光',
        key: 3
    }
];
export const typeMap = list2map(typeList, { key: 'key', value: 'label' });

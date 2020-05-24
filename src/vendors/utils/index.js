import ListToTree from 'list-to-tree';

export const list2tree = list => {
    const ltt = new ListToTree(list, {
        key_id: 'id',
        key_parent: 'parentId',
        key_child: 'children'
    });
    return ltt.GetTree();
};

export const list2map = (list = [], props = { key: 'value', value: 'label' }) => {
    const tempMap = {};
    list.forEach(item => {
        tempMap[item[props.key]] = item[props.value];
    });
    return tempMap;
};

export const waiting = (time = 1000) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});


/**
 * @param arr
 * @returns {*}
 */
export function removeEmptyArrayElement(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === undefined || arr[i] === '') {
            arr.splice(i, 1);
            i = i - 1;
            // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
            // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
    }
    return arr;
}

export const filtersCommit = (namespaced, name, time = 500) => {
    let timer = null;
    return {
        set(value) {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                this.$store.commit(`${namespaced}/FILTERS`, Object.assign({}, {
                    [name]: value,
                    page: 1
                }));
                clearTimeout(timer);
            }, time);
        },
        get() {
            return this.filters[name];
        }
    };
};

export function getConfig(configCache, fileName) {
    if (!configCache || !configCache[fileName]) {
        return false;
    }
    if (configCache[fileName].default) {
        return configCache[fileName].default
    }
    return configCache[fileName];
}

export function getCache(context) {
    let cache = {};
    context.keys().forEach(key => {
        const keys = key.split('/');
        const cloneKeys = [...keys];
        const fileName = keys.pop();
        const moduleName = keys.pop();
        if (cloneKeys.includes('children')) {
            keys.pop();
            const parentModuleName = keys.pop();
            if (!cache[parentModuleName]) {
                cache[parentModuleName] = {};
            }
            if (!cache[parentModuleName]['children']) {
                cache[parentModuleName]['children'] = {};
            }
            if (!cache[parentModuleName]['children']) {
                cache[parentModuleName]['children'][moduleName] = {};
            }
            if (!cache[parentModuleName]['children'][moduleName]) {
                cache[parentModuleName]['children'][moduleName] = {
                    [fileName]: context(key)
                };
            } else {
                cache[parentModuleName]['children'][moduleName][fileName] = context(key);
            }
        } else {
            if (!cache[moduleName]) {
                cache[moduleName] = {
                    [fileName]: context(key)
                };
            }  else {
                cache[moduleName][fileName] = context(key);
            }
        }
    });
    return cache;
}

export function to(promise) {
    return promise.then(data => [null, data])
        .catch(err => [err]);
}

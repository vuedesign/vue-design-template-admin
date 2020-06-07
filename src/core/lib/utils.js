
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

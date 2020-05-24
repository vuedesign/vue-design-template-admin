import { getConfig } from './utils';

const configContext = require.context('@configs', true, /^\.\/([a-zA-Z0-9_-]*)\.(js|json)$/);
const configCache = (() => {
    const cacheData = {}; 
    configContext.keys().forEach(keyUrl => {
        const [, keyName] = keyUrl.split('/');
        cacheData[keyName] = configContext(keyUrl);
    });
    return cacheData;
})();

export function config(fileName) {
    return getConfig(configCache, fileName);
}

export function configs(fileNames) {
    if (!Array.isArray(fileNames)) {
        console.warn(`fileNames must be an array`);
        return;
    }
    const files = {};
    fileNames.forEach(fileName => {
        files[fileName] = config(fileName);
    });
    return files;
}

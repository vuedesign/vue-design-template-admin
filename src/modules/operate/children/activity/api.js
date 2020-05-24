import { http } from 'vue-design-core';

const API_URL = '/api/v1/operate/activity';

export function find(params = {}) {
    return http({
        method: 'get',
        url: API_URL,
        params
    });
}

export function findOne(id, params = {}) {
    return http({
        method: 'get',
        url: `${API_URL}/${id}`,
        params
    });
}

export function update(id, data = {}) {
    return http({
        method: 'put',
        url: `${API_URL}/${id}`,
        data
    });
}

export function create(id, data = {}) {
    return http({
        method: 'post',
        url: API_URL,
        data
    });
}

export function destroy(id, data = {}) {
    return http({
        method: 'delete',
        url: `${API_URL}/${id}`,
        data
    });
}

export function updateOne(id, data = {}) {
    return http({
        method: 'patch',
        url: `${API_URL}/${id}`,
        data
    });
}

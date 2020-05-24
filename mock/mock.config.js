module.exports = {
    response(data) {
        if (data.list && Array.isArray(data.list)) {
            Object.assign(data, {
                pagination: {
                    page: 1,
                    size: 20,
                    total: 100,
                    next: null,
                    prev: null
                }
            })
        }
        return {
            status: 200,
            data
        };
    },
    port: 3000,
    prefix: '/api/v1',
    delay: 200
};

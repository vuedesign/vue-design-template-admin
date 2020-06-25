module.exports = {
    '/user-info GET': cxt => {
        return {
            'root|20': [
                {
                    'id|+1': 10000,
                    name: '@cname()',
                    thumb: '@image("64")',
                    region: '@cname()',
                    date: '@date()',
                    time: '@time()',
                    delivery: false,
                    type: [1, 2, 3, 4],
                    resource: '@cname()',
                    desc: '@cname(20)'
                }
            ]
        }
    }
};

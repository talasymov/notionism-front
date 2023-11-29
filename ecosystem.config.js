module.exports = {
    apps: [{
        name: 'notionism.org',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
    }]
}
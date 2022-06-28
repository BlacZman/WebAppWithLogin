const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/api/user",
    "/api/token"
];

module.exports = function (app) {
    const templateProxy = createProxyMiddleware(context, {
        target: 'https://localhost:44360',
        secure: false
    });

    app.use(templateProxy);
};

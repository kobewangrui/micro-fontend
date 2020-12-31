const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use('/sys/', createProxyMiddleware({ target: 'http://172.16.15.202:9500/',"changeOrigin": true }));
};
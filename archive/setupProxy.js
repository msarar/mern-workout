const { legacyCreateProxyMiddleware  } = require('http-proxy-middleware');

module.exports = function(app) {
    const proxy_url = process.env.REACT_APP_IS_DOCKER? "http://node-app:4000" : 'http://localhost:4000/';
    app.use(
      '/api/',
      legacyCreateProxyMiddleware ({
        target: proxy_url,
        changeOrigin: true,
      })
    );
  };
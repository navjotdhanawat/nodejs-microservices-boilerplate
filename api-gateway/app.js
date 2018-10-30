const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
const services = require('./config/services');
const url = require('url')

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/users', function(req, res) {
//     res.send({res: true})
// });

// app.use((req, res, next) => {
//   const err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
    const message = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.json({
        status: 'error',
        message: err,
    });
});
/* eslint-enable no-unused-vars */


// Bootstrap services
for (let i = 0; i < services.length; i++) {
    const name = services[i].name;
    const host = services[i].host;
    const port = services[i].port;
    const rootPath = services[i].rootPath || "";
    const protocol = services[i].protocol || "http";

    console.log(`Boostrapping service: ${protocol}://${host}:${port}/${rootPath}`);


    // need to restream the request so that it can be proxied

    app.use(`/api/${name}*`, (req, res, next) => {
        const newPath = url.parse(req.originalUrl).pathname.replace(`/api/${name}`, rootPath);
        console.log(`Forwarding request to: ${newPath}`);
        proxy.web(req, res, { target: `${protocol}://${host}:${port}/${newPath}` }, next);
    });
}

module.exports = app;
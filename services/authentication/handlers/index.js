module.exports = (app) => {
    app.use('/api/login', require('./handlers/login'));
}
const usersRouter = require('./users');
const postsRouter = require('./posts');

module.exports = function (app) {

  app.use(function (req, res, next) {
    req.reqDate = new Date();

    next();
  });

  app.use('/users', usersRouter);
  app.use('/posts', postsRouter);

  /*app.get('/', function (req, res, next) {
    res.sendfile('index.html');
  });*/

  app.use(function (err, req, res, next) {
    const status = err.status || 500;

    res.status(status).send(err);
  })
};
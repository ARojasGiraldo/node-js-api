const express = require('express');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');

function routerApi(app) {
  const path = express.Router();
  app.use('/api/v1', path);
  path.use('/products', productsRouter);
  path.use('/categories', categoriesRouter);
  path.use('/users', usersRouter);
}

module.exports = routerApi;

'use strict';

const path = require('path');
const express = require('express');

/**
 * Installs routes that serve production-bundled client-side assets.
 * It is set up to allow for HTML5 mode routing (404 -> /dist/index.html).
 * This should be the last router in your express server's chain.
 */
module.exports = (app) => {

  app.use('/api/todos', require('./api/todos'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(app|api|node_modules|assets)/*')
  .get((req, res) => {
    return res.send('<h1>404 Not Found</h1>')
  });
};

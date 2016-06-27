'use strict';

/**
 * TODO Investigate further, as this file came from a project using NodeJS and webpack along with Angular 2
 */

const config = require('./proxy-config');

module.exports = function getWebpackConfig() {
  // Webpack needs the paths to end with a wildcard, node doesn't.
  // Webpack also needs to be told to strip the path off the proxied
  // request.
  return Object.keys(config).reduce((acc, path) => {
    acc[path + '*'] = config[path];
    acc[path + '*'].rewrite = (req) => {
      req.url = req.url.replace(path, '');
    };

    return acc;
  }, {});
};

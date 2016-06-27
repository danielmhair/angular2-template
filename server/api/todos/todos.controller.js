'use strict';

var _ = require('lodash');
var Testament = require('./todos.model');

// Get list of clients
exports.index = function(req, res) {
  Testament.find(function (err, testaments) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(testaments);
  });
};

// Get a single testament
exports.show = function(req, res) {
  Testament.findById(req.params.id, function (err, testament) {
    if(err) { return handleError(res, err); }
    if(!testament) { return res.status(404).send('Not Found'); }
    return res.json(testament);
  });
};

// Creates a new testament in the DB.
exports.create = function(req, res) {
  Testament.create(req.body, function(err, testament) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(testament);
  });
};

// Updates an existing testament in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Testament.findById(req.params.id, function (err, testament) {
    if (err) { return handleError(res, err); }
    if(!testament) { return res.status(404).send('Not Found'); }
    var updated = _.merge(testament, req.body);
    if (req.body && req.body.books) {
      updated.books = req.body.books;
    }
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(testament);
    });
  });
};

// Deletes a testament from the DB.
exports.destroy = function(req, res) {
  Testament.findOneAndRemove(req.params.id, function(err) {
    if(err) { return handleError(res, err); }
    return res.status(204).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}

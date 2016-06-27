'use strict';

var express = require('express');
var controller = require('./todos.controller');

var router = express.Router();

router.use(function(req, res, next) {
  //TODO Change this to only the port that Angular 2 is using (not *, but 127.0.0.1:3000)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  next();
});

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;

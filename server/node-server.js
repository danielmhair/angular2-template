'use strict';

const express = require('express');
const winston = require('winston');
const helmet = require('helmet');
const nodeAppServer = require('./routes.server');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3001;
let config = require('./config');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options, err => {
  if (err) {
    winston.error('MongoDB connection error: ' + err);
    process.exit(1);
  }

  winston.info("MongoDB is connected");
});

mongoose.connection.on('error', err => {
  if (err) {
    winston.error(err);
    process.exit(-1);
  }
});

// Enable various security helpers.
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

if (config.seedMongo) {
  require('./MongoManager').seed();
}

// Serve the distributed assets and allow HTML5 mode routing. NB: must be last.
nodeAppServer(app);

// Start up the server.
app.listen(PORT, (err) => {
  if (err) {
    winston.error(err);
    return;
  }

  winston.info(`Listening on port ${PORT}`);
});

exports = {};

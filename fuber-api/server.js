'use strict';

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

const config = require('./config/config');
const mongoose = require('mongoose');
const chalk = require('chalk');
const _ = require('lodash');
const k = require('sample-lib').constants;

// Init models
require('sample-lib').utils.initBaseModels(mongoose);

// Plug application promise to mongo
mongoose.Promise = Promise;

// Bootstrap db connection
mongoose.connect(config.url, k.DB_OPTIONS, err => {
  if (err) {
    console.error(chalk.red('Could not connect to MongoDB!'));
    console.log(chalk.red(err));
    throw err;
  }
});

// Init the express application
const app = require('./config/express');

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log(`${config.applicationName} started on port ${config.port}`);



'use strict';
/**
 * express and middlewares
 */

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const helmet = require('helmet');
const compression = require('compression');
const XError = require('x-error');
const err = require('sample-lib').utils.errors;
const _ = require('lodash');

// Initialize express app
const app = express();
app.use(compression());

// Environment dependent middleware
if (process.env.NODE_ENV === 'development') {
  // Enable logger (morgan)
  app.use(morgan('dev'));
}

// Request body parsing middleware should be above methodOverride
app.use(bodyParser.json());

app.use((error, req, res, next) => {
  next(new XError(err.input).ex(error));
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(methodOverride());

// Use helmet to secure Express headers
app.use(helmet());
app.disable('x-powered-by');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Server status check
app.get('/status.html', (req, res) => {
  res.status(200).send();
});

app.use(express.static('public'));
app.use('/bower_components', express.static('bower_components'));

// Register routes
require('../app/routes')(app);

// Catch-all error handler
app.use((error, req, res, next) => { //eslint-disable-line no-unused-vars

  if (process.env.NODE_ENV === 'development') {
    console.log(error.message);
    console.log(error.stack);
  }
  // Anything that unhandled
  res.status(500).json({
    code: 1000,
    msg: 'Internal error'
  });
});

// Assume 404 since no middleware responded
app.use((req, res) => {
  res.status(404).send('Resource not available');
});

// exports express app to server file
module.exports = app;
'use strict';
/*
 * Handle specific errors
 *
*/


const errors = require('./errors');
const XError = require('x-error');

exports.mongoose = (e) => {
  throw new XError(errors.internal).extend(e);
}

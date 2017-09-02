'use strict';
/**
 * Application-wide error codes and messages
 */
module.exports = {
  // Code 1000 is reserved for the default error code
  internal: {
    code: 1001,
    httpCode: 500,
    httpResponse: 'Internal error',
    safe: true
  },
  input: {
    code: 1002,
    httpCode: 400,
    httpResponse: 'Invalid input',
    safe: true
  },
  id: {
    code: 1003,
    httpCode: 400,
    httpResponse: 'Invalid Id',
    safe: true
  },
  notFound: {
    code: 1004,
    httpCode: 404,
    httpResponse: 'Resource not found',
    safe: true
  }
};

'use strict';

/* Application routes entry point
 *
 *
*/
const cabApi = require('./cab.router');
const hireApi = require('./hire.router');
module.exports =  (app) => {
  app.use('/cab', cabApi);
  app.use('/hire', hireApi)
};


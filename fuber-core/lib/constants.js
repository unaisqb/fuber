'use strict '
/*
  Application wide constants
*/

module.exports = {
  DB_OPTIONS: {
    server: {
      /*eslint-disable camelcase*/
      auto_reconnect: true,
      /*eslint-enable camelcase*/
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 30000
      }
    }
  },
};

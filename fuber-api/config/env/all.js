'use strict';

/* default configurations
 * eg: port
 *
 */

module.exports = {
  port: process.env.PORT || 3002,
  dbUser: process.env.DB_USER || null,
  dbPassword: process.env.DB_PASSWORD || null,
  applicationName: 'Demo application'
};
'use strict';
/*
 * cab controller
 */

const cabService = require('sample-lib').services.cab;
const mongooseErrorHandler = require('sample-lib').utils.errorHandler.mongoose;
const _ = require('lodash');

exports.index = (req) => {
  let query = req.query;
  if (req.query.latitude && req.query.longitude) {
    // customer request
    let userLocation = {
      latitude: parseFloat(req.query.latitude),
      longitude: parseFloat(req.query.longitude)
    };
    query = {
      isAssigned: false,
      location: {
        $near: [userLocation.latitude, userLocation.longitude]
      }
    };
    query = _.assign(query, {
      isPink: (req.query.isPink || false)
    });
    return cabService.findOne(query).then(null, mongooseErrorHandler);
  }
  // if no location provided it is an index query
  let limit = query.limit || 10;
  let page = query.page || 1;
  let opts = {
    limit: +limit,
    skip: +(query.page - 1) * query.limit
  };
  query = _.omit(query, ['limit', 'page']);
  return cabService.find(query, opts).then(function (results) {
    return {
      records: results,
      count: results.length,
      limit: limit,
      page: page
    };
  }, mongooseErrorHandler);
};

exports.create = (req) => {
  return cabService.create(req.body).then(null, mongooseErrorHandler);
};

exports.delete = (req) => {
  return cabService.delete(req.body.cabId).then(null, mongooseErrorHandler);
};

exports.update = (req) => {
  return cabService.update({}, req.body).then(null, mongooseErrorHandler);
};
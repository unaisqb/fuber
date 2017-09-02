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
	query = {isAssigned: false, location: {$near: [userLocation.latitude, userLocation.longitude]}};
	query = _.assign(query, {isPink: (req.query.isPink || false)});
	return cabService.findOne(query).then(null, mongooseErrorHandler);
 }
 return cabService.find(query).then(null, mongooseErrorHandler);
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

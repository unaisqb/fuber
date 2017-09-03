'use strict';
/*
 * hire controller
 */

const hireService = require('sample-lib').services.hire;
const mongooseErrorHandler = require('sample-lib').utils.errorHandler.mongoose;
const cabService = require('sample-lib').services.cab;
const Xerror = require('x-error');
exports.index = (req) => {
  return hireService.find({}).then(null, mongooseErrorHandler);
};

exports.create = (req) => {
  return cabService.findOne({
    _id: req.body.cabId
  }).then(function (cab) {
    if (cab && !cab.isAssigned) {
      return cabService.update({
        _id: cab._id
      }, {
        isAssigned: true
      }).then(function () {
        return hireService.create(req.body);
      });
    } else if (cab && cab.isAssigned) {
      throw new Xerror(`cab with id ${cab._id} already hired`);
    } else {
      throw new Xerror(`cab with id ${req.body.cabId} not found`);
    }
  }).then(null, mongooseErrorHandler);
};

exports.delete = (req) => {
  return hireService.delete(req.body.hireId).then(null, mongooseErrorHandler);
};

exports.update = (req) => {
  let reqHire = req.body.hire;
  let customerLocation = [req.body.customer.latitude, req.body.customer.longitude];
  return hireService.findOne({
    _id: reqHire._id
  }).then(function (hire) {
    if (hire && !hire.amount) {
      return cabService.update({
        _id: hire.cabId
      }, {
        isAssigned: false,
        location: customerLocation
      }, {
        new: true
      }).then(function (cab) {
        let hiredTime = new Date(reqHire.arrivedAt).getTime() - new Date(
          hire.createdAt).getTime();
        let hiredTimeinMinutes = hiredTime / 60000;
        let minimumCharge = 1;
        let totalCharge = minimumCharge * hiredTimeinMinutes;
        totalCharge = cab.isPink ? totalCharge + 5 : totalCharge;
        return hireService.update({
          _id: hire._id
        }, {
          arrivedAt: new Date(reqHire.arrivedAt),
          amount: totalCharge
        }, {
          new: true
        });
      });
    } else if (hire && hire.amount) {
      // if already amount calculated return the hire transaction
      return Promise.resolve(hire);
    } else {
      throw new Xerror(
        `hire history with id ${req.body.hire._id} not found`);
    }
  }).then(null, mongooseErrorHandler);
};
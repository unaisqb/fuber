'use strict';

/*
 * cab service functions
*/

const db = require('mongoose');

exports.find = (query, opts) => {
  return db.model('Cab').find(query, {}, opts);
};

exports.findOne = (query) => {
  return db.model('Cab').findOne(query);
};

exports.delete = (query) => {
  return db.model('Cab').delete(query);
};

exports.update = (query, updateData, options) => {
  return db.model('Cab').findOneAndUpdate(query, updateData, options);
};

exports.create = (cab) => {
  return db.model('Cab').create(cab);
};





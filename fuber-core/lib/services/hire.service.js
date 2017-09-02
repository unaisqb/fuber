'use strict';

/*
 * hire service functions
*/

const db = require('mongoose');

exports.find = (query) => {
  return db.model('Hire').find(query);
};

exports.findOne = (query) => {
  return db.model('Hire').findOne(query);
};

exports.delete = (query) => {
  return db.model('Hire').delete(query);
};

exports.update = (query, updateData, options) => {
  return db.model('Hire').findOneAndUpdate(query, updateData, options);
};

exports.create = (hire) => {
  return db.model('Hire').create(hire);
};





'use strict';
/*
  cab model
*/

const Schema = require('mongoose').Schema;

module.exports = {
  location: {
    type: [Number],
    required: true,
    index: '2d'
  },
  imageUrl: String,
  driverName: String,
  phoneNumber: String,
  cabNo: String,
  isPink: {
    type: Boolean,
    default: false
  },
  isAssigned: {
    type: Boolean,
    default: false
  }
};

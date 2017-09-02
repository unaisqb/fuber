'use strict';
/*
  Hire model
*/

const Schema = require('mongoose').Schema;

module.exports = {
  imageUrl: String,
  customerId: Schema.Types.ObjectId,
  cabId: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  },
  arrivedAt: {
    type: Date
  },
  amount: Number
};

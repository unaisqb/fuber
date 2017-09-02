'use strict';

/*
 cab examples mock
*/
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
	cab: {
	  location: [1, 2],
	  _id: new ObjectId('557287f4be4f6f0602a0a6c0')
	},
	pinkCab: {
	  location: [1, 2],
	  isPink: true,
	  _id: new ObjectId('557287f4be4f6f0602a0a6c1')
	}
};

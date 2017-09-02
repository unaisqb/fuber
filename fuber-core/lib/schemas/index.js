'use strict';

// Extend and export base schemas
module.exports = {
  Cab: {
    modelName: 'Cab',
    collectionName: 'cabs',
    definition: require('./cab.schema')
  },
  Hire: {
    modelName: 'Hire',
    collectionName: 'hires',
    definition: require('./hire.schema')  	
  }
};

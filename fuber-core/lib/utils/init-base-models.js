'use strict';

const schemaDefinitions = require('../schemas');
const _ = require('lodash');

module.exports = (db) => {
  _.forEach(schemaDefinitions, (schema) => {
    if (!db.models[schema.modelName]){
      db.model(
        schema.modelName,
        new db.Schema(schema.definition, {collection: schema.collectionName}));
    }
  });
};

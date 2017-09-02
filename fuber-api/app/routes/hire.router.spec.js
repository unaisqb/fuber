'use strict';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const config = require('../../config/config');
const mongoose = require('mongoose');
const request = require('supertest');
const cabMock = require('../tests/').cabMock;
const hireMock = require('../tests/').hireMock;
const _ = require('lodash');
mongoose.Promise = Promise;

// Init models
require('sample-lib').utils.initBaseModels(mongoose);

const app = require('../../config/express');

describe('Hire API', () => {
  before((done) => {
    mongoose.connect(config.url, () => {
      const cabModel =  mongoose.model('Cab');
      cabModel.create(cabMock.cab).then(function(){
        done();        
      });
    });
  });

  after((done) => {
    mongoose.model('Cab').remove({}).then(function () {
      mongoose.model('Hire').remove({}).then(function (){
        mongoose.connection.close(done);
      });
    })
  });

  it('Hire a cab', (done) => {
    request(app)
      .post('/hire')
      .send(hireMock.hire)
      .expect(200)
      .end((err, res) => {
        expect(res.body.cabId).eql(hireMock.hire.cabId);
        done();
      });
  });

  it('Pay the cab', (done) => {
    request(app)
      .put('/hire')
      .send(_.assign({'hire': hireMock.hire}, {'customer': hireMock.customer}))
      .expect(200)
      .end((err, res) => {
        expect(res.body.cabId).eql(hireMock.hire.cabId);
        done();
      });
  });

});

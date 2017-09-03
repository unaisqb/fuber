'use strict';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const config = require('../../config/config');
const mongoose = require('mongoose');
const request = require('supertest');
const cabMock = require('../tests/').cabMock;
const _ = require('lodash');
mongoose.Promise = Promise;

// Init models
require('sample-lib').utils.initBaseModels(mongoose);

const app = require('../../config/express');
describe('Cab API', () => {
  before((done) => {
    mongoose.connect(config.url, () => {
      mongoose.model('Cab').remove({}).then(function () {
        done();
      });
    });
  });

  after((done) => {
    mongoose.model('Cab').remove({}).then(function () {
     mongoose.connection.close(done);
    });
  });

  it('Create Cab', (done) => {
    request(app)
      .post('/cab')
      .send(cabMock.cab)
      .expect(200)
      .end((err, res) => {
        expect(res.body.location).eql(cabMock.cab.location);
        done();
      });
  });

  it('Create Pink Cab', (done) => {
    request(app)
      .post('/cab')
      .send(cabMock.pinkCab)
      .expect(200)
      .end((err, res) => {
        expect(res.body.isPink).eql(true);
        done();
      });
  });

  it('Get Cab', (done) => {
    request(app)
      .get('/cab')
      .expect(200)
      .end((err, res) => {
        expect(res.body.records.length).eql(2);
        done();
      });
  });

  it('Get pink Cab', (done) => {
    request(app)
      .get('/cab')
      .query({isPink: true})
      .expect(200)
      .end((err, res) => {
        expect(res.body.records.length).eql(1);
        done();
      });
  });
});

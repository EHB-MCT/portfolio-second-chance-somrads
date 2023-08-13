const express = require('express');
const { expect } = require('chai');
const request = require('supertest');

// Import your router
const router = require('../routes/users');

// Create an Express app and use the router
const app = express();
app.use('/', router);

describe('GET /', () => {
  it('should return a list of users', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});

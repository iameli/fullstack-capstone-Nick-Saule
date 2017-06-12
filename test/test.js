'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
//const mongoose = require('mongoose');
const should = chai.should();

chai.use(chaiHttp);

const {app} = require('../server');


describe('access root', function() {
    it('should return 200 and html', function() {
      return chai.request(app)
        .get('/')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.html;
        });
    });
});




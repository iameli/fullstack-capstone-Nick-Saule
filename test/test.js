'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
//const mongoose = require('mongoose');
const should = chai.should();

chai.use(chaiHttp);

const {app} = require('../server');


const {DATABASE_URL} = require('../config');
const {Show} = require('../models');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');


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


const SHOW = {
  title: faker.name.title(),
  returns: faker.random.words()
};

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}

function seedShow(){
  return Show.create(SHOW);
}

function seedShowData() {
  //console.info('seeding blog post data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      title: faker.name.title(),
      returns: faker.random.words()
    });
  }
  // this will return a promise
  return BlogPost.insertMany(seedData);
}

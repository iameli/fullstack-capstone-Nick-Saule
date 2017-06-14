'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();
const faker = require('faker');

chai.use(chaiHttp);

const {app} = require('../server');


const {DATABASE_URL} = require('../config');
const {Show} = require('../models');
const {closeServer, runServer} = require('../server');
//const {TEST_DATABASE_URL} = require('../config');


function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}



const SHOW = {
    'title': 'Star Trek',
    'returns': 'October 2017'
};

function seedShow(){
    return Show.create(SHOW);
}

function seedShowData() {
  //console.info('seeding blog post data');
    const seedData = [];
    for (let i=1; i<=10; i++) {
        seedData.push({
            title: faker.random.words(),
            returns: faker.random.words()
        });
    }
    return Show.insertMany(seedData);
}


describe('Show API resource', function () {

    before(function() {
        return runServer();
    });

    beforeEach(function() {
        return seedShowData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

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

    describe('POST endpoint', function(){
        it('should add a new show', function(){
            const newShow=SHOW;
            return chai.request(app)
        .post('/shows')
        .send(newShow)
        .then(function(res){
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.include.keys(
            'title','returns');
            res.body.title.should.equal(newShow.title);
            res.body.returns.should.equal(newShow.returns);
            return Show.findById(res.body.id);
        })
        .then(function(show){
            show.title.should.equal(newShow.title);
            show.returns.should.equal(newShow.returns);
        });
        });
    });
    

    describe('PUT endpoint', function () {

        it('should update fields you send over', function () {
            const updateData = {
            returns: 'January 30'
        };

            return Show
        .findOne()
        .exec()
        .then(show => {
            updateData.id = show.id;

            return chai.request(app)
            .put(`/shows/${show.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.returns.should.equal(updateData.returns);

          return Show.findById(res.body.id).exec();
        })
        .then(post => {
          post.returns.should.equal(updateData.returns);
        });
    });
  });

describe ('DELETE endpoint', function() {

    it('should delete a show by id', function() {

      let show;

      return Show
        .findOne()
        .exec()
        .then(_show => {
          show = _show;
          return chai.request(app)
            .delete(`/shows/${show.id}`)
        })

        .then(res => {
          res.should.have.status(204);
          return Show.findById(show.id);
        })
        .then(_show => {
          should.not.exist(_show);
        });
    });
  });

});
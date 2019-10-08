//Test envirorment

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Country = require("../models/country");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('../app/app');
let should = chai.should();


chai.use(chaiHttp);

describe('Country', () => {
    /*beforeEach((done) => { 
        //TODO
        console.log("Running test");
        done();                  
    });*/

  describe('GET /country', () => {
      it('should get all the countries of database', (done) => {
        chai.request(server)
            .get('/country')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});

/*describe('Country', () => {
    beforeEach((done) => { 
        //TODO
        console.log("Running test");
        done();                  
    });

  describe('POST /country/new', () => {
      it('should create new country', (done) => {
        chai.request(server)
            .post('/country')
            .send(country)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  //res.body.should.be.a('array');
              done();
            });
      });
  });

});*/
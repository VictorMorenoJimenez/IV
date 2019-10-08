//Test envirorment

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let State = require("../models/city");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('../app/app');
let should = chai.should();


chai.use(chaiHttp);

describe('City', () => {
  beforeEach((done) => { 
    State.deleteOne({}, (err) => { 
      done();           
   });      
  });

  describe('POST /city/new', () => {
      it('should create new city', (done) => {
        let n_city = {
          name: "Test City",
          holidays: [
            {
              day: 1,
              month: 1,
              description: "Test"
            }
          ],
          state: "StateTEst",
          country: "Country Test"
        }

        chai.request(server)
            .post('/city/new')
            .send(n_city)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message')
                  .eql('City successfully added!');
              done();
            });
      });
  });

  describe('POST /city/new', () => {
    it('should not create city without name', (done) => {
      let n_city = {
        holidays: [],
        state: "StateTest",
        country: "CountryTest"
      }

      chai.request(server)
          .post('/city/new')
          .send(n_city)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('City validation failed: name: Path `name` is required.');
            done();
          });
    });
});

  describe('GET /city', () => {
      it('should get all the cities of database', (done) => {
        chai.request(server)
            .get('/city')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});
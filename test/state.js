//Test envirorment

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let State = require("../models/state");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('../app/app');
let should = chai.should();


chai.use(chaiHttp);

describe('State', () => {
  beforeEach((done) => { 
    State.deleteOne({}, (err) => { 
      done();           
   });      
  });

  describe('POST /state/new', () => {
      it('should create new state', (done) => {
        let n_state = {
          name: "Test State",
          holidays: [
            {
              day: 1,
              month: 1,
              description: "Test"
            }
          ],
          country: "CountryTest",
          cities: [
            "City test1",
            "City test2"
          ]
        }

        chai.request(server)
            .post('/state/new')
            .send(n_state)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message')
                  .eql('State successfully added!');
              done();
            });
      });
  });

  describe('POST /state/new', () => {
    it('should not create state without name', (done) => {
      let n_state = {
        holidays: [],
        country: "CountryTEst",
        cities: [
          "City test1",
          "City test2"
        ]
      }

      chai.request(server)
          .post('/state/new')
          .send(n_state)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('State validation failed: name: Path `name` is required.');
            done();
          });
    });
});

  describe('GET /state', () => {
      it('should get all the states of database', (done) => {
        chai.request(server)
            .get('/state')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });

});
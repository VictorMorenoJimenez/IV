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
  beforeEach((done) => { 
    Country.deleteOne({}, (err) => { 
      done();           
   });      
  });

  describe('POST /country/new', () => {
      it('should create new country', (done) => {
        let n_country = {
          name: "Spain",
          holidays: [
            {
              day: 1,
              month: 1,
              description: "Test"
            }
          ],
          states: [
            "State test1",
            "State test2"
          ]
        }

        chai.request(server)
            .post('/country/new')
            .send(n_country)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message')
                  .eql('Country successfully added!');
              done();
            });
      });
  });

  describe('POST /country/new', () => {
    it('should not create country without name', (done) => {
      let n_country = {
        states: [
          "State test1",
          "State test2"
        ]
      }

      chai.request(server)
          .post('/country/new')
          .send(n_country)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('Country validation failed: name: Path `name` is required.');
            done();
          });
    });
});

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


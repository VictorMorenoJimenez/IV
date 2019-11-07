//Test envirorment

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Country = require("../models/country");
let Controller = require("../app/controller")

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

  describe('GET /status/', () => {
    it('Returns if the app is running', (done) => {
      chai.request(server)
          .get('/status/')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
    });
  });

  describe('PUT /country/new', () => {
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
            .put('/country/new')
            .send(n_country)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message')
                  .eql('Country successfully added!');
              done();
            });
      });
  });

  describe('PUT /country/new', () => {
    it('should not create country without name', (done) => {
      let n_country = {
        states: [
          "State test1",
          "State test2"
        ]
      }

      chai.request(server)
          .put('/country/new')
          .send(n_country)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('child \"name\" fails because [Name is required and must be String]');
            done();
          });
    });
});

describe('PUT /country/new', () => {
  it('should not create country without holidays', (done) => {
    let n_country = {
      name:"Test",
      states: [
        "State test1",
        "State test2"
      ]
    }

    chai.request(server)
        .put('/country/new')
        .send(n_country)
        .end((err, res) => {
              res.body.should.have.property('message')
              .eql('child \"holidays\" fails because [\"holidays\" is required]');
          done();
        });
  });
});

describe('PUT /country/:country_name', () => {
  it('should create new holiday to country :country_name', (done) => {
    let holidays = {
      day: 1,
      month: 1,
      description: "Test holiday"
    }

    chai.request(server)
        .put('/country/Spain')
        .send(holidays)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('message')
              .eql('Holiday successfully added to country');
          done();
        });
  });
});

describe('PUT /country/state/:country_name', () => {
  it('should add a new state to country :country_name', (done) => {
    let country = {
      state: "teststate",
    }

    chai.request(server)
        .put('/country/state/Spain')
        .send(country)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('message')
              .eql("State successfully added to Country");
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

  describe('GET /country/:country_name', () => {
    it('should get the holidays from the country Spain', async (done) => {
        /*chai.request(server)
        .get('/country/Spain')
        .end((err, res) => {
          try {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
          } catch(err){
            done(err);
          }
        });*/
        try{
          let holidays = await Controller.getCountryHolidays("Spain");
        } catch(e){
          done(e);
        }
        
  
    });
  });

  describe('DELETE /country/:country_name', () => {
    it('should delete the holidays given in POST of country country_name', (done) => {
      let holidays = {
        day: 1,
        month: 1,
        description: "Test holiday"
      }
      //First we create the holiday
      chai.request(server)
      .put('/country/Spain')
      .send(holidays)
      .end((err, res) => {
            res.should.have.status(201);
      });

      //Then we delete it
      chai.request(server)
          .delete('/country/Spain')
          .send(holidays)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });

  describe('DELETE /country/delete/:country_name', () => {
    it('should delete the country country_name', (done) => {
      let country = {
        name: "testCountry",
        holidays: [
          {
            day: 1,
            month: 1,
            description: "testHoliday"
          }
        ],
        states: ["State1,State2"]
      }
      //First we create the a test Country
      chai.request(server)
      .put('/country/new')
      .send(country)
      .end((err, res) => {
            res.should.have.status(201);
      });

      //Then we delete it
      chai.request(server)
          .delete('/country/delete/testCountry')
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('message')
                .eql("Country removed successfully")
            done();
          });
    });
  });

});


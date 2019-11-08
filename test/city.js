//Test envirorment

process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let City = require("../models/city");

let chai = require("chai");
let chaiHttp = require('chai-http');
let server = require('../app/app');
let should = chai.should();
let Controller = require("../app/controller");


chai.use(chaiHttp);

describe('City', () => {
  /*beforeEach((done) => { 
    City.deleteOne({}, (err) => { 
      done();           
   });      
  });*/

  describe('PUT /city/new', () => {
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
            .put('/city/new')
            .send(n_city)
            .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.have.property('message')
                  .eql('City successfully added!');
              done();
            });
      });
  });

  describe('PUT /city/new', () => {
    it('should not create city without name', (done) => {
      let n_city = {
        holidays: [],
        state: "StateTest",
        country: "CountryTest"
      }

      chai.request(server)
          .put('/city/new')
          .send(n_city)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('child \"name\" fails because [Name is required and must be String]');
            done();
          });
    });
});

describe('PUT /city/new', () => {
  it('should not create city without holidays', (done) => {
    let n_city = {
      name: "TestCity",
      state: "StateTest",
      country: "CountryTest"
    }

    chai.request(server)
        .put('/city/new')
        .send(n_city)
        .end((err, res) => {
              res.body.should.have.property('message')
              .eql('child \"holidays\" fails because [\"holidays\" is required]');
          done();
        });
  });
});

describe('PUT /city/:city_name', () => {
  it('should create new holiday to city :city_name', (done) => {
    let holidays = {
      day: 1,
      month: 1,
      description: "Test holiday"
    }

    chai.request(server)
        .put('/city/Ibiza')
        .send(holidays)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('message')
              .eql('Holiday successfully added to city');
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

  describe('GET /city/:city_name', () => {
    it('should get holidays from city :city_name',  async () => {
      try{
        let holidays = await Controller.getCityHolidays("Test City");
        //Now if everything is correct we delete it
        chai.request(server)
        .delete('/city/delete/Test City')
        .end((err, res) => {
              res.should.have.status(200)
              res.body.should.have.property('message')
              .eql("City removed successfully")
        });
      }catch(e){
        console.log(e);
      }
    });
  });

  describe('DELETE /city/:city_name', () => {
    it('should delete the holidays given in POST of city city_name', (done) => {
      let holidays = {
        day: 1,
        month: 1,
        description: "Test holiday"
      }
      
      chai.request(server)
      .put('/city/Ibiza')
      .send(holidays)
      .end((err, res) => {
            res.should.have.status(201);
      });
  
      chai.request(server)
          .delete('/city/Ibiza')
          .send(holidays)
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
  });

  describe('DELETE /city/delete/:city_name', () => {
    it('should delete the city city_name', (done) => {
      let city = {
        name: "testCity",
        country: "testCountry",
        state: "testState",
        holidays: [
          {
            day: 1,
            month: 1,
            description: "testHoliday"
          }
        ]
      }
      //First we create the a test city
      chai.request(server)
      .put('/city/new')
      .send(city)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message')
        .eql('City successfully added!');
      });
  
      //Then we delete it
      chai.request(server)
          .delete('/city/delete/testCity')
          .end((err, res) => {
                res.should.have.status(200)
                res.body.should.have.property('message')
                .eql("City removed successfully")
            done();
          });
    });
  });
});

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

  describe('PUT /state/new', async () => {
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

        try {
          chai.request(server)
          .put('/state/new')
          .send(n_state)
          .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message')
                .eql('State successfully added!');
            done();
          });
        } catch(e){
          done(e);
        }

      });
  });

  /*

  describe('PUT /state/new', () => {
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
          .put('/state/new')
          .send(n_state)
          .end((err, res) => {
                res.body.should.have.property('message')
                .eql('child \"name\" fails because [Name is required and must be String]');
            done();
          });
    });
});

describe('PUT /state/new', () => {
  it('should not create state without holidays', (done) => {
    let n_state = {
      name: "Testname",
      country: "CountryTEst",
      cities: [
        "City test1",
        "City test2"
      ]
    }

    chai.request(server)
        .put('/state/new')
        .send(n_state)
        .end((err, res) => {
              res.body.should.have.property('message')
              .eql('child \"holidays\" fails because [\"holidays\" is required]');
          done();
        });
  });
});

describe('PUT /state/:state_name', () => {
  it('should create new holiday to state :state_name', (done) => {
    let holidays = {
      day: 1,
      month: 1,
      description: "Test holiday"
    }

    chai.request(server)
        .put('/state/Islas Baleares')
        .send(holidays)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('message')
              .eql('Holiday successfully added to state');
          done();
        });
  });
});

describe('PUT /state/city/:state_name', () => {
  it('should add a new city to state :state_name', (done) => {
    let city = {
      city: "testcity"
    }

    chai.request(server)
        .put('/state/city/Islas Baleares')
        .send(city)
        .end((err, res) => {
              res.should.have.status(201);
              res.body.should.have.property('message')
              .eql('City added successfully to state');
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
  describe('GET /state/:state_name', () => {
    it('should get all the holidays from state :state_name', (done) => {
      chai.request(server)
          .get('/state/Islas Baleares')
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
          });
    });
});

describe('DELETE /state/:state_name', () => {
  it('should delete the holidays given in POST of state state_name', (done) => {
    let holidays = {
      day: 1,
      month: 1,
      description: "Test holiday"
    }
    //First we create the holiday
    chai.request(server)
    .put('/state/Islas Baleares')
    .send(holidays)
    .end((err, res) => {
          res.should.have.status(201);
    });

    //Then we delete it
    chai.request(server)
        .delete('/state/Islas Baleares')
        .send(holidays)
        .end((err, res) => {
              res.should.have.status(200);
          done();
        });
  });
});

describe('DELETE /state/delete/:state_name', () => {
  it('should delete the state state_name', (done) => {
    let state = {
      name: "testState",
      country: "testCountry",
      holidays: [
        {
          day: 1,
          month: 1,
          description: "testHoliday"
        }
      ],
      cities: ["City1,City2"]
    }
    //First we create the a test State
    chai.request(server)
    .put('/state/new')
    .send(state)
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.have.property('message')
      .eql('State successfully added!');
    });

    //Then we delete it
    chai.request(server)
        .delete('/state/delete/testState')
        .end((err, res) => {
              res.should.have.status(200)
              res.body.should.have.property('message')
              .eql("State removed successfully")
          done();
        });
  });
});
*/

});
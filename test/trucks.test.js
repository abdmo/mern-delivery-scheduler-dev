//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Truck = require("../models/truck.model.js");

// Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Trucks", () => {
  beforeEach((done) => {
    Truck.remove({}, (err) => {
      done();
    });
  });

  // /GET
  describe("/GET truck", () => {
    it("it should GET all trucks", (done) => {
      chai
        .request(server)
        .get("/trucks")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // /POST
  describe("/POST truck", () => {
    it("it should POST a truck ", (done) => {
      let truck = {
        plate_number: "ABC123",
        status: "Available",
      };
      chai
        .request(server)
        .post("/trucks/add")
        .send(truck)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("plate_number");
          res.body.should.have.property("status");
          done();
        });
    });
  });

  // /POST with one missing required field
  describe("/POST truck", () => {
    it("it should not POST a truck without plate number", (done) => {
      let truck = {
        status: "Available",
      };
      chai
        .request(server)
        .post("/trucks/add")
        .send(truck)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  // /POST update
  describe("/POST truck", () => {
    it("it should POST a truck ", (done) => {
      let truck = {
        plate_number: "ABC123",
        status: "Available",
      };
      chai
        .request(server)
        .post("/trucks/add")
        .send(truck)
        .end((err, res) => {
          res.should.have.status(200);

          describe("/GET truck", () => {
            it("it should GET all trucks", (done) => {
              chai
                .request(server)
                .get("/trucks/")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("array");
                  res.body.length.should.be.eql(1);
                  const truckId = res.body[0]._id;

                  // /GET with status "Available"
                  describe("/GET truck", () => {
                    it("it should GET all trucks with status Available", (done) => {
                      chai
                        .request(server)
                        .get("/trucks/available")
                        .end((err, res) => {
                          console.log(res.body);
                          res.should.have.status(200);
                          res.body.should.have.property("_id").eq(truckId);
                          res.body.should.have
                            .property("status")
                            .eq("Available");
                          done();
                        });
                    });
                  });

                  describe("/POST truck", () => {
                    it("it should update truck with ID: " + truckId, (done) => {
                      let truck = {
                        status: "In Use",
                      };
                      chai
                        .request(server)
                        .post("/trucks/update/" + truckId)
                        .send(truck)
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.have.property("_id").eq(truckId);
                          res.body.should.have.property("status").eq("In Use");
                          done();
                        });
                    });
                  });
                  done();
                });
            });
          });
          done();
        });
    });
  });
});

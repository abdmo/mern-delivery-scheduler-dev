//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Record = require("../models/record.model.js");

// Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
chai.use(chaiHttp);

describe("Records", () => {
  beforeEach((done) => {
    Record.remove({}, (err) => {
      done();
    });
  });

  // /GET
  describe("/GET record", () => {
    it("it should GET all the records", (done) => {
      chai
        .request(server)
        .get("/records")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // /POST
  describe("/POST record", () => {
    it("it should POST a record ", (done) => {
      let record = {
        status: "New",
        receiver_name: "Receiver",
        to_address: "Address",
        delivery_date: "123",
        truck_id: "deieu203001-20x0x021",
        truck_plate_number: "ABC123",
      };
      chai
        .request(server)
        .post("/records/add")
        .send(record)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("status");
          res.body.should.have.property("receiver_name");
          res.body.should.have.property("to_address");
          res.body.should.have.property("delivery_date");
          res.body.should.have.property("truck_id");
          res.body.should.have.property("truck_plate_number");
          done();
        });
    });
  });

  // /POST with one missing required field
  describe("/POST record", () => {
    it("it should not POST a record without receiver name", (done) => {
      let record = {
        status: "New",
        to_address: "Address",
        delivery_date: "123",
        truck_id: "deieu203001-20x0x021",
        truck_plate_number: "ABC123",
      };
      chai
        .request(server)
        .post("/records/add")
        .send(record)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  // /POST update
  describe("/POST record", () => {
    it("it should POST a record ", (done) => {
      let record = {
        status: "New",
        receiver_name: "Receiver2",
        to_address: "Address",
        delivery_date: "123",
        truck_id: "deieu203001-20x0x021",
        truck_plate_number: "ABC123",
      };
      chai
        .request(server)
        .post("/records/add")
        .send(record)
        .end((err, res) => {
          res.should.have.status(200);

          describe("/GET record", () => {
            it("it should GET all records", (done) => {
              chai
                .request(server)
                .get("/records/")
                .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("array");
                  res.body.length.should.be.eql(1);
                  const recordId = res.body[0]._id;

                  describe("/GET record", () => {
                    it("it should GET record with ID: " + recordId, (done) => {
                      chai
                        .request(server)
                        .get("/records/" + recordId)
                        .end((err, res) => {
                          res.should.have.status(200);
                          res.body.should.have.property("_id").eq(recordId);
                          done();
                        });
                    });
                  });

                  describe("/POST record", () => {
                    it(
                      "it should update record with ID: " + recordId,
                      (done) => {
                        let record = {
                          status: "Scheduled",
                        };
                        chai
                          .request(server)
                          .post("/records/update/" + recordId)
                          .send(record)
                          .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.have.property("_id").eq(recordId);
                            res.body.should.have
                              .property("status")
                              .eq("Scheduled");
                            done();
                          });
                      }
                    );
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

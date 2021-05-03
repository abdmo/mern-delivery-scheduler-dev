import React, { Component } from "react";
import axios from "axios";

export default class CreateTruck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plateNumber: "",
    };
  }

  onChangePlateNumber = (e) => {
    this.setState({
      plateNumber: e.target.value.toUpperCase().trim(),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const truck = {
      plate_number: this.state.plateNumber,
    };
    console.log(truck);

    axios
      .post("/trucks/add", truck)
      .then((res) => {
        alert("Truck created!");
        window.location = "/trucks/";
      })
      .catch((error) => {
        if (error.response) {
          alert(
            "Error! Truck with plate number " +
              this.state.plateNumber +
              " already exists"
          );
        }
      });
  };

  render() {
    return (
      <div>
        <h3>Add Truck</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Plate Number: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.plateNumber}
              onChange={this.onChangePlateNumber}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Truck"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";

const Truck = (props) => (
  <tr>
    <td>{props.truck.plate_number}</td>
    <td>{props.truck.status}</td>
  </tr>
);

export default class TrucksList extends Component {
  constructor(props) {
    super(props);
    this.state = { trucks: [] };
  }

  componentDidMount() {
    axios
      .get("/trucks/")
      .then((response) => {
        this.setState({ trucks: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  truckList = () => {
    return this.state.trucks.map((currenttruck) => {
      return <Truck truck={currenttruck} key={currenttruck.plate_number} />;
    });
  };

  render() {
    return (
      <div>
        <h3>Trucks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Plate Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{this.truckList()}</tbody>
        </table>
      </div>
    );
  }
}

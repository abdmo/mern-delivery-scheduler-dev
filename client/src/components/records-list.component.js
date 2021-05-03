import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Record = (props) => (
  <tr>
    <td>{props.record.status}</td>
    <td>{props.record.receiver_name}</td>
    <td>{props.record.to_address}</td>
    <td>{props.record.delivery_date}</td>
    <td>{props.record.truck_plate_number}</td>
    <td>
      <Link to={"/update-record/" + props.record._id}>update</Link>
    </td>
  </tr>
);

export default class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.state = { records: [] };
  }

  componentDidMount() {
    axios
      .get("/records/")
      .then((response) => {
        this.setState({ records: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  recordList = () => {
    return this.state.records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={this.deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Records</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Status</th>
              <th>Receiver Name</th>
              <th>Delivery Address</th>
              <th>Delivery Date</th>
              <th>Truck ID</th>
            </tr>
          </thead>
          <tbody>{this.recordList()}</tbody>
        </table>
      </div>
    );
  }
}

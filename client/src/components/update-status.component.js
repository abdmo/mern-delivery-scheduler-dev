import React, { Component } from "react";
import axios from "axios";

export default class UpdateStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevStatus: "",
      status: "",
      receiverName: "",
      toAddress: "",
      truckId: "",
      truckPlateNumber: "",
      deliveryDate: "",
      statusList: ["New", "Scheduled", "Completed", "Cancelled"],
    };
  }

  componentDidMount() {
    axios
      .get("/records/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          prevStatus: response.data.status,
          status: response.data.status,
          receiverName: response.data.receiver_name,
          toAddress: response.data.to_address,
          deliveryDate: response.data.delivery_date,
          truckId: response.data.truck_id,
          truckPlateNumber: response.data.truck_plate_number,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const prevStatus = this.state.prevStatus;
    const targetStatus = this.state.status;
    if (prevStatus === "New" && targetStatus === "Completed") {
      alert("Can't change status 'New' to 'Completed'");
    } else if (prevStatus === "Scheduled" && targetStatus === "New") {
      alert("Can't change status 'Scheduled' to 'New'");
    } else if (prevStatus === "Completed" && targetStatus === "New") {
      alert("Can't change status 'Completed' to 'New'");
    } else if (prevStatus === "Cancelled" && targetStatus === "New") {
      alert("Can't change status 'Cancelled' to 'New'");
    } else {
      if (targetStatus === "Completed" || targetStatus === "Cancelled") {
        const truck = { status: "Available" };
        if (this.state.truckId !== "")
          axios
            .post("/trucks/update/" + this.state.truckId, truck)
            .then((res) => console.log(res.data));
      }

      const record = { status: this.state.status };
      axios
        .post("/records/update/" + this.props.match.params.id, record)
        .then((res) => {
          console.log(res.data);
          alert("Update Success!");
          window.location = "/";
        });
    }
  };

  render() {
    return (
      <div>
        <h3>Update Status</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Status: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
            >
              {this.state.statusList.map(function (status) {
                return (
                  <option key={status} value={status}>
                    {status}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Receiver Name: </label>
            <input
              readOnly
              type="text"
              className="form-control"
              value={this.state.receiverName}
            />
          </div>
          <div className="form-group">
            <label>Delivery Address: </label>
            <input
              readOnly
              type="text"
              className="form-control"
              value={this.state.toAddress}
            />
          </div>
          <div className="form-group">
            <label>Delivery Date: </label>
            <input
              readOnly
              type="text"
              className="form-control"
              value={this.state.deliveryDate}
            />
          </div>
          <div className="form-group">
            <label>Truck ID: </label>
            <input
              readOnly
              type="text"
              className="form-control"
              value={this.state.truckPlateNumber}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

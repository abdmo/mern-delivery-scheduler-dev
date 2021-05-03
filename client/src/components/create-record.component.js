import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receiverName: "",
      toAddress: "",
      deliveryDate: new Date(),
    };
  }

  getAnAvailableTruck = () => {
    return axios
      .get("/trucks/available")
      .then((response) => {
        return {
          id: response.data._id,
          plate_number: response.data.plate_number,
        };
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  onChangeReceiverName = (e) => {
    this.setState({
      receiverName: e.target.value.toUpperCase(),
    });
  };

  onChangeToAddress = (e) => {
    this.setState({
      toAddress: e.target.value.toUpperCase(),
    });
  };

  onChangeDeliveryDate = (date) => {
    this.setState({
      deliveryDate: date,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const receiverName = this.state.receiverName.trim();
    const toAddress = this.state.toAddress.trim();
    if (receiverName === "" || toAddress === "") {
      alert("Error! Blank space detected");
    } else {
      this.getAnAvailableTruck().then((truck_data) => {
        if (truck_data) {
          const truck = { status: "In Use" };
          axios
            .post("/trucks/update/" + truck_data.id, truck)
            .then((res) => console.log(res.data));

          const record = {
            status: "New",
            receiver_name: receiverName,
            to_address: toAddress,
            delivery_date: this.state.deliveryDate,
            truck_id: truck_data.id,
            truck_plate_number: truck_data.plate_number,
          };
          console.log(record);
          axios.post("/records/add", record).then((res) => {
            alert("Record Created!");
            window.location = "/";
          });
        } else {
          alert("Can't create new record. No truck is available");
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Create New Delivery Record</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Receiver Name: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.receiverName}
              onChange={this.onChangeReceiverName}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.toAddress}
              onChange={this.onChangeToAddress}
            />
          </div>
          <div className="form-group">
            <label>Delivery Date: </label>
            <div>
              <DatePicker
                selected={this.state.deliveryDate}
                onChange={this.onChangeDeliveryDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}

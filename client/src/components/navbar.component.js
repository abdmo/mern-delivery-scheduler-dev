import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">
          Delivery Scheduler
        </Link>
        <div className="collpase navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Records
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create-record" className="nav-link">
                Create New Record
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/trucks" className="nav-link">
                Trucks
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/add-truck" className="nav-link">
                Add Truck
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

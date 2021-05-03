import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import RecordsList from "./components/records-list.component";
import CreateRecord from "./components/create-record.component";
import UpdateStatus from "./components/update-status.component.js";
import TrucksList from "./components/trucks-list.component.js";
import CreateTruck from "./components/create-truck.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RecordsList} />
        <Route path="/create-record" component={CreateRecord} />
        <Route path="/update-record/:id" component={UpdateStatus} />
        <Route path="/trucks" exact component={TrucksList} />
        <Route path="/add-truck" component={CreateTruck} />
      </div>
    </Router>
  );
}

export default App;

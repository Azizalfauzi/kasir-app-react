import React, { Component } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavbarComponents } from "./components";
import { Home, Success } from "./pages";
export default class App extends Component {
  render() {
    return (
      <Router>
        <NavbarComponents />
        <main>
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/success" element={<Success />} />
          </Routes>
        </main>
      </Router>
    );
  }
}

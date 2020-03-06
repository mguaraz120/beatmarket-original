import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to="/" className="navbar-brand">
          Home
        </Link>{" "}
        <Link to="/checkout" className="navbar-brand">
          Checkout
        </Link>{" "}
        <Link to="/login" className="navbar-brand">
          Producer Login
        </Link>
      </nav>
    );
  }
}

export default connect(null, {})(Nav);

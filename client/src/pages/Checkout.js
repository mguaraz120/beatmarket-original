import React, { Component } from "react";
import { Container, Row, Col } from "../components/Grid";
import { Input } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCart, removeFromCart } from "../redux/actions";

class Checkout extends Component {
  state = {
    totalPrice: 0,
    email: "",
    firstName: "",
    lastName: ""
  };

  componentDidMount() {
    this.props.getCart();
    const totalPrice = this.getTotal(this.props.cart);
    this.setState({ totalPrice });
  }

  getTotal(cart) {
    if (cart.length === 0) return 0;
    return cart
      .map(x => x.license.price)
      .reduce((total, licensePrice) => {
        return total + licensePrice;
      });
  }

  removeBeat = beatId => {
    const cart = this.props.cart.filter(item => item.beat._id !== beatId);
    const totalPrice = this.getTotal(cart);
    this.props.removeFromCart(beatId);
    this.setState({ totalPrice });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.createCustomer({
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
    console.log(API.getCustomers());
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Hurry up and buy!</h1>
        </Jumbotron>
        {this.props.cart.map(({ beat, license }) => (
          <Row key={beat._id}>
            <Col size="md-3">
              <p>{beat.title}</p>
            </Col>
            <Col size="md-3">
              <p>{license.price}</p>
            </Col>
            <Col size="md-3">
              <button
                onClick={() => this.removeBeat(beat._id)}
                className="btn btn-primary"
              >
                Remove
              </button>
            </Col>
          </Row>
        ))}
        <Row>
          <Col size="md-3"></Col>
          <Col size="md-3">
            <p>Total: {this.state.totalPrice}</p>
          </Col>
        </Row>
        <br />
        <form>
          <p>Email Address</p>
          <Input
            value={this.state.email}
            onChange={this.handleInputChange}
            name="email"
            placeholder="(required)"
          />

          <p>First Name</p>
          <Input
            value={this.state.firstName}
            onChange={this.handleInputChange}
            name="firstName"
            placeholder="(required)"
          />

          <p>Last Name</p>
          <Input
            value={this.state.lastName}
            onChange={this.handleInputChange}
            name="lastName"
            placeholder="(required)"
          />
          <button
            className="btn btn-primary"
            disabled={
              !(this.state.email && this.state.firstName && this.state.lastName)
            }
            onClick={this.handleFormSubmit}
          >
            Complete Purchase
          </button>
        </form>
      </Container>
    );
  }
}

Checkout.propTypes = {
  getCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps, { getCart, removeFromCart })(Checkout);

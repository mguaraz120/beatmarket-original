import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Col, Row } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/testAPI";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";

class BeatsByProducer extends Component {
  state = {
    producer: "",
    beats: [],
    selectedLicense: ""
  };

  componentDidMount() {
    this.loadBeatsAndLicences();
  }

  loadBeatsAndLicences = () => {
    const id = parseInt(this.props.match.params.id);
    const producer = API.getProducers().find(producer => producer._id === id);
    const beats = producer.beats;
    this.setState({ producer, beats });
  };

  handleLicenseSelected = license => {
    this.setState({ selectedLicense: license });
  };

  handleAddToCart = (beat, license) => {
    this.props.addToCart({ beat, license });
    this.setState({ selectedLicense: "" });
  };

  render() {
    const { producer } = this.state;
    return (
      <Container fluid>
        <Jumbotron>
          <h1>{producer.name}</h1>
          <h4>Checkout out my beats</h4>
        </Jumbotron>
        {this.state.beats.map(beat => (
          <Row key={beat._id}>
            <Col size="md-1">
              <p>{beat.title}</p>
            </Col>
            <Col size="md-5">
              <audio controls>
                <source src={beat.file} type="audio/mpeg" />
              </audio>
            </Col>
            <Col size="md-3">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      Purchase
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      {producer.licenses.map(license => (
                        <div key={license._id}>
                          <input
                            type="radio"
                            id={license.name}
                            name={`${beat.title}_license`}
                            value={license.name}
                            onChange={() => this.handleLicenseSelected(license)}
                          />
                          <label htmlFor={license.name}>{license.name}</label>

                          <label htmlFor={license.price}>
                            ${license.price}
                          </label>
                        </div>
                      ))}

                      <button
                        onClick={() =>
                          this.handleAddToCart(beat, this.state.selectedLicense)
                        }
                        className="btn btn-primary"
                        disabled={!this.state.selectedLicense}
                      >
                        Add to Cart
                      </button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        ))}
      </Container>
    );
  }
}

BeatsByProducer.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { addToCart })(BeatsByProducer);

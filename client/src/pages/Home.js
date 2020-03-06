import React, { Component } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Container, Col, Row } from "../components/Grid";
import API from "../utils/testAPI";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../redux/actions";

class Home extends Component {
  state = {
    beats: [],
    selectedLicense: ""
  };

  componentDidMount() {
    this.loadBeats();
  }

  loadBeats = () => {
    const beatsByDifferentProducers = [];
    API.getFiles();
    API.getProducers().forEach(producer => {
      let myBeats = producer.beats;
      let displayBeat = myBeats[0];
      if (displayBeat)
        beatsByDifferentProducers.push({
          producer: producer,
          beat: displayBeat
        });
    });
    this.setState({ beats: beatsByDifferentProducers });
  };

  handleLicenseSelected = license => {
    this.setState({ selectedLicense: license });
  };

  handleAddToCart = (beat, license) => {
    this.props.addToCart({ beat, license });
    this.setState({ selectedLicense: "" });
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Welcome to the Beat Market!</h1>
          <h4>Checkout out these cool beats</h4>
        </Jumbotron>
        {this.state.beats.map(({ producer, beat }) => (
          <Row key={beat._id}>
            <Col size="md-1">
              <p>{beat.title}</p>
            </Col>
            <Col size="md-5">
              <audio controls>
                <source src={beat.file} type="audio/mpeg" />
              </audio>
            </Col>
            <Col size="md-1">
              <Link to={"/beatsbyproducer/" + producer._id}>
                <strong>{producer.name}</strong>
              </Link>
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

Home.propTypes = {
  addToCart: PropTypes.func.isRequired
};

export default connect(null, { addToCart })(Home);

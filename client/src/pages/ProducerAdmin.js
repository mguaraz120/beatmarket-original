import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Container } from "../components/Grid";
import { Col, Row } from "../components/Grid";
import { Input } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/testAPI";
class ProducerAdmin extends Component {
  state = {
    producerId: 0,
    beats: [],
    licenses: [],
    title: "",
    file: ""
  };

  componentDidMount() {
    this.loadBeatsAndLicences();
  }

  loadBeatsAndLicences = () => {
    const id = parseInt(this.props.match.params.id);
    const producer = API.getProducers().find(producer => producer._id === id);
    if (!producer) return;
    const myBeats = [];
    producer.beats.forEach(beat => {
      myBeats.push({ producer: producer, beat: beat });
    });
    this.setState({
      beats: myBeats,
      licenses: producer.licenses,
      producerId: id
    });
  };

  handleRemoveBeat = id => {
    API.deleteBeatByProducer(2, id);
    this.loadBeatsAndLicences();
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    API.saveBeat(this.state.producerId, {
      title: this.state.title,
      file: this.state.file
    });
    console.log(API.getBeats());
    this.loadBeatsAndLicences();
    this.setState({ title: "", file: "" });
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Add or Remove Beats</h1>
        </Jumbotron>
        {this.state.beats.map(({ beat }) => (
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
                      Remove
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <button
                        className="btn btn-primary"
                        onClick={() => this.handleRemoveBeat(beat._id)}
                      >
                        Are you sure?
                      </button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Col>
          </Row>
        ))}

        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Add
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <label htmlFor="title">New Beat Title</label>
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Beat Title"
                />

                <label htmlFor="file">Select a file:</label>
                <Input
                  value={this.state.file}
                  onChange={this.handleInputChange}
                  name="file"
                  type="file"
                  id="file"
                />

                <Row>
                  <Col size="md-3">License</Col>
                  <Col size="md-3">Price</Col>
                </Row>
                {this.state.licenses.map(license => (
                  <Row key={license._id}>
                    <Col size="md-3">
                      <label>{license.name}</label>
                    </Col>
                    <Col size="md-3">
                      <span> ${license.price}</span>
                    </Col>
                  </Row>
                ))}
                <Row>
                  <form
                    action="/api/beats/upload"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <div className="custom-file mb-3">
                      <input
                        type="file"
                        name="file"
                        id="file"
                        className="custom-file-input"
                      />
                      <label htmlFor="file" className="custom-file-label">
                        Choose File
                      </label>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary btn-block"
                    />
                  </form>
                </Row>
                <Row>
                  <Col size="md-3">
                    <button
                      className="btn btn-primary"
                      disabled={!this.state.file || !this.state.title}
                      onClick={this.handleFormSubmit}
                    >
                      Add Beat
                    </button>
                  </Col>
                  <Col size="md-3"></Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
    );
  }
}

export default ProducerAdmin;

import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Container } from "../components/Grid";
import { Col, Row } from "../components/Grid";
import { Input } from "../components/Form";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
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
    API.getProducer(id)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    // if (!producer) return;
    // const myBeats = [];
    // producer.beats.forEach(beat => {
    //   myBeats.push({ producer: producer, beat: beat });
    // });
    // this.setState({
    //   beats: myBeats,
    //   licenses: producer.licenses,
    //   producerId: id
    // });
  };

  handleRemoveBeat = beat => {
    const { producerId } = this.state;
    API.deleteBeatByProducer(producerId, beat)
      .then(res => {
        console.log(res.data.deleted);
      })
      .then(() => {
        this.loadBeatsAndLicences();
      })
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  /* class BeatFile {
  // _id: Number
  // length: Number,
  // chunkSize: Number,
  // uploadDate: Date,
  // filename: String,
  // md5: String,
  // contentType: String
} */

  handleFormSubmit = event => {
    event.preventDefault();
    let filename = "";
    const { title, producerId } = this.state;

    API.getFiles()
      .then(res => {
        const beatFiles = res.data;
        const newFile = beatFiles.pop();
        filename = newFile.filename;
      })
      .then(() => {
        API.createBeat(producerId, {
          title: title,
          file: filename
        });
      })
      .then(() => {
        this.loadBeatsAndLicences();
      })
      .catch(err => console.log(err));

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
                <source src={"/api/audio/" + beat.file} type="audio/mpeg" />
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
                        onClick={() => this.handleRemoveBeat(beat)}
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
                <br />
                <Row>
                  <Col size="md-3">
                    <button
                      className="btn btn-primary"
                      // disabled={!this.state.title}
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

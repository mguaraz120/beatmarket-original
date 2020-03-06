import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

class Detail extends Component {
  state = {
    beat: {}
  };
  // When this component mounts, grab the beat with the _id of this.props.match.params.id
  // e.g. localhost:3000/beats/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getBeat(this.props.match.params.id)
      .then(res => this.setState({ beat: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h3>
                {this.state.beat.title} by {this.state.beat.author}
              </h3>
            </Jumbotron>
          </Col>
        </Row>
        {/* <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Synopsis</h1>
              <p>
                {this.state.beat.synopsis}
              </p>
            </article>
          </Col>
        </Row> */}
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Authors</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;

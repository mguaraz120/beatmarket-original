import React, { Component } from "react";
import { Container } from "../components/Grid";
import { Input } from "../components/Form";
import { Link } from "react-router-dom";
import API from "../utils/API";

// convert to class
// state producerId
// API get first producers id
// name method loadFirstProducersId()
// Use Link component link Home Component beatsbyproducer
class ProducerLogin extends Component {
  state = {
    producerId: []
  };

  componentDidMount() {
    this.loadBeats();
  }

  loadFirstProducersId = () => {
    API.getProducers()
      .then(res => {
        console.log(`res: ${res}`);
        console.log(`res.data: ${res.data}`);
        this.setState({ producerId: this.firstProducersId });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form>
        <Container>
          <p>Username</p>
          <Input />

          <p>Password</p>
          <Input />

          <Link to={"/producerAdmin/" + this.state.producerId}>
            Producer Login
          </Link>
        </Container>
      </form>
    );
  }
}
export default ProducerLogin;

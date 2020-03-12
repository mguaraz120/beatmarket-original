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
    producerId: -1
  };

  componentDidMount() {
    this.loadFirstProducersId();
  }

  loadFirstProducersId = () => {
    API.getProducers()
      .then(res => {
        const producers = res.data;
        if (!producers || producers.length < 1) {
          console.log("no producers.");
          return;
        }

        this.setState({ producerId: producers[0]._id });
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
            <button className="btn btn-primary btn-block">
              Producer Login
            </button>
          </Link>
        </Container>
      </form>
    );
  }
}
export default ProducerLogin;

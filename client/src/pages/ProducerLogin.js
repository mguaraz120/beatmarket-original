import React from "react";
import { Container } from "../components/Grid";
import { Input } from "../components/Form";

const ProducerLogin = () => {
  return (
    <form>
      <Container>
        <p>Username</p>
        <Input />

        <p>Password</p>
        <Input />
        <a href="/produceradmin/2" className="btn btn-primary" role="button">
          Producer Login
        </a>
      </Container>
    </form>
  );
};
export default ProducerLogin;

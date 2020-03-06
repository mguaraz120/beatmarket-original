import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";
import Checkout from "./pages/Checkout";
import ProducerLogin from "./pages/ProducerLogin";
import ProducerAdmin from "./pages/ProducerAdmin";
import BeatsByProducer from "./pages/BeatsByProducer";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Nav />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/login" component={ProducerLogin} />
            <Route exact path="/produceradmin/:id" component={ProducerAdmin} />
            <Route
              exact
              path="/beatsbyproducer/:id"
              component={BeatsByProducer}
            />
            <Route component={NoMatch} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

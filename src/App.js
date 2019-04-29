import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { IonApp, IonRouterOutlet } from "@ionic/react";

import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import TabOneDetailPage from "./pages/TabOneDetailPage"

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <IonApp>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute
                exact
                path="/"
                render={() => <Redirect to="/home" />}
              />
            <IonRouterOutlet>
              <Route path="/register" component={RegistrationPage} />
              <PrivateRoute  path="/home" component={HomePage} />
              <PrivateRoute  path="/tab1-detail/:id" component={TabOneDetailPage} />
            </IonRouterOutlet>
          </Switch>
        </IonApp>
      </Router>
    );
  }
}

export default App;

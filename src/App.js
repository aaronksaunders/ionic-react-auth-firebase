import React from "react";
import { Route, Redirect } from "react-router-dom";

import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

import { observer, MobXProviderContext } from "mobx-react";

const PrivateRoutes = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        {/****** AUTH CREATE ACCOUNT */}
        <Route path="/login" component={LoginPage} exact={true} />
        <Route path="/register" component={RegistrationPage} exact={true} />
        <Route path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
const PublicRoutes = () => {
  return (
    <IonReactRouter>
      <Route path="/tabs" component={HomePage} />
      <Route path="/" render={() => <Redirect to="/tabs/home" />} />
    </IonReactRouter>
  );
};

const App = () => {
  const { store } = React.useContext(MobXProviderContext);

  return !store.authCheckComplete ? (
    <IonApp>
      <IonLoading message="Starting App..." />
    </IonApp>
  ) : (
    <IonApp>{store.authenticatedUser ? <PublicRoutes /> : <PrivateRoutes />}</IonApp>
  );
};

export default observer(App);

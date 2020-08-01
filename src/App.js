import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { IonApp, IonSpinner, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

import { observer, MobXProviderContext } from "mobx-react";
import { autorun } from "mobx";

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
  const [hasUser, setHasUser] = useState(false);
  useEffect(() => {
    autorun(() => {
      setHasUser(store.authenticatedUser !== null);
    });
  }, [store.authenticatedUser]);

  console.log(hasUser);

  return !store.authCheckComplete ? (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <IonSpinner name="circles" />
    </div>
  ) : (
    <IonApp>{hasUser ? <PublicRoutes /> : <PrivateRoutes />}</IonApp>
  );
};

export default observer(App);

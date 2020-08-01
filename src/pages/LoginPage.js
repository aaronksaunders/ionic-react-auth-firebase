import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonToast,
  IonText,
  IonPage,
  IonContent,
} from "@ionic/react";
import { useHistory } from "react-router";

import { observer, MobXProviderContext } from "mobx-react";

const LoginPage = () => {
  const { store } = React.useContext(MobXProviderContext);
  let { isAuth, initializationError } = store;
  const history = useHistory();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("");
  const [errorInfo, setErrorInfo] = useState({});

  /**
   *
   */
  const _doLogin = async () => {
    try {
      let r = await store.doLogin(email, password);
      if (r.code) {
        throw r;
      }
      setErrorInfo({});
      return history.push("/tabs/home");
    } catch (e) {
      setErrorInfo({ showErrorToast: true, errMsg: e.message });
      return false;
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" />
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonText color="danger" padding style={{ fontWeight: "500" }}>
          {initializationError && initializationError.message}
        </IonText>

        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            onIonChange={(e) => {
              setEmail(e.detail.value);
            }}
            name="email"
            value="test@test.com"
          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            type="password"
            onIonChange={(e) => {
              setPassword(e.detail.value);
            }}
            name="password"
          />
        </IonItem>
        <div style={{ padding: 10, paddingTop: 20 }}>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={(e) => {
              if (!e.currentTarget) {
                return;
              }
              e.preventDefault();
              _doLogin(history);
            }}
          >
            {isAuth ? "Logged In" : "Login"}
          </IonButton>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={(e) => {
              e.preventDefault();
              history.push("/register");
            }}
          >
            Create Account
          </IonButton>
        </div>
        <IonToast
          color="danger"
          isOpen={errorInfo.showErrorToast}
          onDidDismiss={() => setErrorInfo({ showErrorToast: false })}
          message={errorInfo.errMsg}
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default observer(LoginPage);

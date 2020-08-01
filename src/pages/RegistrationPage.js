import React, { useState } from "react";
import {
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonToast,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,IonButtons, IonBackButton
} from "@ionic/react";

import { MobXProviderContext, observer } from "mobx-react";
import { useHistory } from "react-router";

const RegistrationPage = () => {
  const { store } = React.useContext(MobXProviderContext);
  const history = useHistory();
  const [errorInfo, setErrorInfo] = useState({});
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [firstName, setFirstName] = useState({});
  const [lastName, setLastName] = useState({});

  const _doCreateAccount = async () => {
    try {
      let r = await store.doCreateUser({
        email,
        password,
        firstName,
        lastName,
      });

      if (r.code) {
        throw r;
      } else {
        history.replace("/tabs/home");
      }
    } catch (e) {
      console.log(e);
      setErrorInfo({ showErrorToast: true, errMsg: e.message });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
        <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email Address</IonLabel>
          <IonInput
            type="email"
            onIonChange={(e) => {
              setEmail(e.detail.value);
            }}
            name="email"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">First Name</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => {
              setFirstName(e.detail.value);
            }}
            name="firstName"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Last Name</IonLabel>
          <IonInput
            type="text"
            onIonChange={(e) => {
              setLastName(e.detail.value);
            }}
            name="lastName"
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
        <div style={{ padding: 8 }}>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={(e) => {
              if (!e.currentTarget) {
                return;
              }
              e.preventDefault();
              _doCreateAccount(history);
            }}
          >
            Create Account
          </IonButton>
          <IonButton
            expand="full"
            style={{ margin: 14 }}
            onClick={(e) => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Cancel
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

export default observer(RegistrationPage);

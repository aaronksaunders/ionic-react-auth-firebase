import React from "react";
import { useHistory } from "react-router";
import {
  IonItem,
  IonContent,
  IonPage,
  IonLabel,
  IonButton,
  IonHeader,
  IonToolbar,
} from "@ionic/react";
// MOBX
import { MobXProviderContext } from "mobx-react";

const TabTwoPage = () => {
  const history = useHistory();
  const { store } = React.useContext(MobXProviderContext);

  const _onLogoutClick = async (e) => {
    e.preventDefault();
    await store.doLogout();
    return history.replace("/login");
  };

  let user = store.activeUser;
  return user ? (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary"></IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="fixed">Email</IonLabel>
          <IonLabel>{user.email}</IonLabel>
        </IonItem>

        <IonItem text-wrap>
          <IonLabel position="fixed">First Name</IonLabel>
          {user.firstName}
        </IonItem>

        <IonItem text-wrap>
          <IonLabel position="fixed">Last Name</IonLabel>
          {user.lastName}
        </IonItem>

        <IonItem text-wrap lines="none" style={{ padding: 10 }}>
          {user.bio}
        </IonItem>

        <IonButton
          expand="full"
          onClick={(e) => {
            _onLogoutClick(e);
          }}
        >
          LOGOUT
        </IonButton>
      </IonContent>
    </IonPage>
  ) : null;
};

export default TabTwoPage;

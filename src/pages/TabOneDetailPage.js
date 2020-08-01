import React from "react";
import {
  IonItem,
  IonLabel,
  IonText,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { MobXProviderContext } from "mobx-react";
import { useParams } from "react-router";
/**
 * sets the `title` and property hasMenu = false so  the menu for the side
 * drawer is NOT displayed.
 *
 * sets the `backAction` property so the back button appears
 *
 * sets the `renderContent` propety to render the contents of the page
 */
const TabOneDetailPage = () => {

  const { store } = React.useContext(MobXProviderContext);
  const params = useParams();
  let value = store.itemByKey(params.id);

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
        <IonItem lines="none">
          <IonLabel>In Tab One Detail Page</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel text-wrap>
            <IonText color="primary">
              <h3>{value.content.subject}</h3>
            </IonText>
            <p>{value.content.body}</p>
            <IonText color="secondary">
              <p>{value.content.dueDate}</p>
            </IonText>
          </IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default TabOneDetailPage;

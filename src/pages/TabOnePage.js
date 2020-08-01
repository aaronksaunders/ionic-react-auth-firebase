import React, {  useState } from "react";
import { useHistory } from "react-router";
import {
  IonItem,
  IonContent,
  IonText,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonLabel,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";

// MOBX
import { MobXProviderContext, observer } from "mobx-react";
import AddItemModal from "./AddItemModal2";

const TabOnePage = ({ addItem }) => {
  const history = useHistory();
  const [refreshing, setRefreshing] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const {store} = React.useContext(MobXProviderContext)

  /**
   *
   */
  const _renderItems = () => {
    return store.itemEntries.map(([key, value]) => {
      return (
        <IonItemSliding key={key}>
          <IonItem
            onClick={(e) => {
              history.push("/tabs/tab1-detail/" + key);
            }}
          >
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

          <IonItemOptions side="end">
            <IonItemOption onClick={(e) => _delete(e, value)} color="danger">
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    });
  };

  const _delete = async (_e, _item) => {
    // close the item
    await _e.target.parentElement.parentElement.closeOpened();
    let result = await store.deleteItem({ id: _item.id });
    if (result) {
      alert("item deleted " + _item.id);
    }
  };

  const _doRefresh = async (event) => {
    console.log("Begin async operation");
    setRefreshing(true);
    await store.loadData();
    setRefreshing(false);
    console.log("Async operation has ended");
  };

  const _renderList = () => {
    return (
      <IonList>
        <IonRefresher onIonRefresh={(e) => _doRefresh(e)}>
          <IonRefresherContent
            style={{ color: "black" }}
            refreshingText="Refreshing..."
            padding
          />
        </IonRefresher>
        <div style={{ paddingTop: refreshing ? 40 : 0 }}>{_renderItems()}</div>
      </IonList>
    );
  };

  if (!store.activeUser) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="end">
            <IonButton
              onClick={(e) => {
                setShowAddItemModal(true);
              }}
            >
              ADD ITEM
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>
        <AddItemModal
          showModal={showAddItemModal}
          onDidDismiss={(_v) => {
            if (_v) {
              console.log(_v.result);
              store.addItem({ ..._v.result });
            }
            setShowAddItemModal(false);
          }}
        />

        <IonItem lines="none">
          <h1>Tab One Page</h1>
        </IonItem>
        <IonItem lines="none">
          <IonLabel>Current User: {store.activeUser.email}</IonLabel>
        </IonItem>
        {_renderList()}
      </IonContent>
    </IonPage>
  );
};

export default observer(TabOnePage);

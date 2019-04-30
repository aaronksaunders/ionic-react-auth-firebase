import React, { Component } from "react";
import {
  IonItem,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonText,
  IonList,
  IonLabel,
  IonButton
} from "@ionic/react";
// MOBX
import { inject, observer } from "mobx-react";
import AddItemModal from "./AddItemModal";

class TabOnePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.props.store.loadData();
  }

  _renderItems = () => {
    return this.props.store.itemEntries.map(([key, value]) => {
      return (
        <IonItem
          key={key}
          onClick={e => {
            if (!e.currentTarget) {
              return;
            }
            e.preventDefault();
            this.props.history.push("/tab1-detail/" + key);
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
      );
    });
  };

  _addItem = () => {
    this.setState(() => ({ showModal: true }));
  };
  render() {
    let { store, history } = this.props;
    return (
      <>
        <AddItemModal
          showModal={this.state.showModal}
          onDidDismiss={_v => {
            if (_v) {
              console.log(_v.result);
              store.addItem({ ..._v.result });
            }
            this.setState(() => ({ showModal: false }));
          }}
        />
        <IonContent padding>
          <IonItem lines="none">
            <h1>Tab One Page</h1>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Current User: {store.activeUser.email}</IonLabel>
          </IonItem>
          <IonButton expand="full" onClick={e => this._addItem()}>
            Add Item
          </IonButton>
          <IonButton
            expand="full"
            onClick={e => {
              if (!e.currentTarget) {
                return;
              }
              e.preventDefault();
              history.push("/tab1-detail/10");
            }}
          >
            Next Page
          </IonButton>
          <IonList>{this._renderItems()}</IonList>
        </IonContent>{" "}
      </>
    );
  }
}

export default inject("store")(observer(TabOnePage));

import React, { Component } from "react";
import {
  IonItem,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonList,
  IonLabel,
  IonButton
} from "@ionic/react";
// MOBX
import { inject } from "mobx-react";
import AddItemModal from "./AddItemModal";

class TabOnePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        showModal : false
    };
  }

  _addItem = () => {
    this.setState(() => ({ showModal: true }));
  };
  render() {
    let { store, history } = this.props;
    return (
      <>
        <AddItemModal
          showModal={this.state.showModal}
          onDidDismiss={(_v) => {
              if (_v) {
                  console.log(_v.ret)
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
        </IonContent>{" "}
      </>
    );
  }
}

export default inject("store")(TabOnePage);

import React, { Component } from "react";
import {
  IonItem,
  IonContent,
  IonText,
  IonList,
  IonLabel,
  IonButton,
  IonItemSliding,
  IonItemOption,
  IonItemOptions
} from "@ionic/react";
import { IonRefresher, IonRefresherContent } from "@ionic/react";

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

  /**
   *
   */
  _renderItems = () => {
    return this.props.store.itemEntries.map(([key, value]) => {
      return (
        <IonItemSliding key={key}>
          <IonItem
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

          <IonItemOptions side="end">
            <IonItemOption onClick={e => this._delete(e, value)} color="danger">
              Delete
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      );
    });
  };

  _delete = async (_e, _item) => {
    let { store } = this.props;
    // close the item
    await _e.target.parentElement.parentElement.closeOpened();
    let result = await store.deleteItem({ id: _item.id });
    if (result) {
      alert("item deleted " + _item.id);
    }
  };

  _addItem = () => {
    this.setState(() => ({ showModal: true }));
  };

  _doRefresh = async event => {
    console.log("Begin async operation");

    await this.props.store.loadData();

    console.log("Async operation has ended");
    event.target.complete();
  };

  _renderList = () => {
    return (
      <IonContent>
        <IonList>
          <IonRefresher slot="fixed" onIonRefresh={e => this._doRefresh(e)}>
            <IonRefresherContent style={{ color: "black" }} />
          </IonRefresher>
          {this._renderItems()}
        </IonList>
      </IonContent>
    );
  };

  render() {
    let { store } = this.props;

    if (!store.activeUser) return null;

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
          {this._renderList()}
        </IonContent>{" "}
      </>
    );
  }
}

export default inject("store")(observer(TabOnePage));

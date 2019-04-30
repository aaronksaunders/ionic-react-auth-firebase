import React, { Component } from "react";
import { withRouter, Redirect, Route } from "react-router-dom";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonButton,
  IonLabel
} from "@ionic/react";

// MOBX
import { inject, observer } from "mobx-react";
import TabContainer from "../components/TabContainer";
// import CatalogHeader from "../components/CatalogHeader";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * used to navigate to a different route in the application
   */
  goToLink = e => {
    if (!e.currentTarget) {
      return;
    }
    e.preventDefault();
    this.props.history.push(e.currentTarget.href);
  };

  _onLogoutClick = async e => {
    e.preventDefault();
    let r = await this.props.store.doLogout();
    this.props.history.push("/login");
  };

  render() {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            <IonButtons slot="end">
              <IonButton
                onClick={e => {
                  this._onLogoutClick(e);
                }}
              >
                LOGOUT
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TabContainer history={this.props.history} />
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(inject("store")(observer(HomePage)));

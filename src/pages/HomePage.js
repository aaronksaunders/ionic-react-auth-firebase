import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  IonPage,
  IonContent,
  IonHeader,
  IonButtons,
  IonToolbar,
  IonButton
} from "@ionic/react";

// MOBX
import { inject, observer } from "mobx-react";
import TabContainer from "../components/TabContainer";
// import CatalogHeader from "../components/CatalogHeader";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onListPage: true
    };
  }


  /**
   * determine if i need to show the add item modal
   */
  _addItem = _value => {
    debugger;
    this.setState(() => ({ showAddItemModal: _value }));
  };

  /**
   * determine if the tabs have changed so I can change the buttons 
   * in the title bar
   */
  _changedTabs = e => {
    if (e.currentTarget.attributes.tab.value === "tab1") {
      this.setState(() => ({ onListPage: true }));
    } else {
      this.setState(() => ({ onListPage: false }));
    }
  };

  render() {
    let { onListPage } = this.state;
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar color="primary">
            {onListPage ? (
              <IonButtons slot="end">
                <IonButton
                  onClick={e => {
                    this.setState(() => ({ showAddItemModal: true }));
                  }}
                >
                  ADD ITEM
                </IonButton>
              </IonButtons>
            ) : null}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <TabContainer
            history={this.props.history}
            changedTabs={e => this._changedTabs(e)}
            addItem={this._addItem}
            showAddItemModal={this.state.showAddItemModal}
          />
        </IonContent>
      </IonPage>
    );
  }
}

export default withRouter(inject("store")(observer(HomePage)));

import React, { Component } from "react";
import { IonItem, IonContent } from "@ionic/react";
// MOBX
import { inject } from "mobx-react";


class TabTwoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <IonContent padding>
        <IonItem>
          <h1>Tab Two Page</h1>
        </IonItem>
      </IonContent>
    );
  }
}

export default inject("store")(TabTwoPage);
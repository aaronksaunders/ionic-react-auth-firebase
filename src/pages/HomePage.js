import { Route, Redirect } from "react-router";
import React from "react";

import TabOnePage from "../pages/TabOnePage";
import TabTwoPage from "../pages/TabTwoPage";

import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";

// MOBX
import { observer } from "mobx-react";
import TabOneDetailPage from "./TabOneDetailPage";

const HomePage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" exact={true}>
          <TabOnePage />
        </Route>

        <Route path="/tabs/tab1-detail/:id" exact={true}>
          <TabOneDetailPage />
        </Route>

        <Route path="/tabs/settings" exact={true}>
          <TabTwoPage />
        </Route>
        <Route path="/tabs" render={() => <Redirect to="/tabs/home" />} />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab2" href="/tabs/settings">
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default observer(HomePage);

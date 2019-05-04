import React from "react";

import TabOnePage from "../pages/TabOnePage";
import TabTwoPage from "../pages/TabTwoPage";
import { IonTabs } from "@ionic/react";

//
// value is used to let us know what view to render
//
// 0 = SHOES, 1 = SOCKS, 2 = CART
const TabContainer = ({ history, changedTabs, addItem , showAddItemModal}) => {
  return (
    <ion-tabs
      ionTabsDidChange={e => {
        changedTabs(e);
      }}
    >
      <ion-tab tab="tab1">
        <TabOnePage
          history={history}
          addItem={addItem}
          showAddItemModal={showAddItemModal}
        />
      </ion-tab>
      <ion-tab tab="tab2">
        <TabTwoPage history={history} />
      </ion-tab>

      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" onClick={changedTabs}>
          <ion-label>Home</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" onClick={changedTabs}>
          <ion-label>Settings</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  );
};

export default TabContainer;

import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonBackButton
} from "@ionic/react";
/**
 * helper Ionic Page which laysout the framework of the page so
 * we dont need to repeat the boilerplate code. We also include
 * the router by default to help with page navigation
 *
 *
 */
const BasicPage = ({ title, renderContent, history, hasMenu, backAction }) => {
  return (
    <>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            {hasMenu ? <IonMenuButton /> : null}
            {backAction ? <IonBackButton defaultHref="/" text="" goBack={() => {}} />: null}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent padding>{renderContent(history)}</IonContent>
    </>
  );
};
BasicPage.propTypes = {
  title: PropTypes.string.isRequired,
  hasMenu: PropTypes.bool,
  backAction: PropTypes.func,
  renderContent: PropTypes.func.isRequired
};

export default withRouter(BasicPage);
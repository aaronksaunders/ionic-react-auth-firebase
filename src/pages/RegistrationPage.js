import React, { Component } from "react";
import { IonItem, IonLabel, IonButton, IonInput, IonToast } from "@ionic/react";
import BasicPage from "../components/BasicPage";

import { inject, observer } from "mobx-react";
/**
 * sets the `title` and property hasMenu = true so that the menu for the side
 * drawer is displayed
 *
 * sets the `renderContent` propety to render the contents of the page
 */
//const LoginPage = ({ isAuth, doLogin }) => {

class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorToast: false,
      errMsg: true
    };

    // see - https://reactjs.org/docs/uncontrolled-components.html
    this.email = React.createRef();
    this.password = React.createRef();
    this.firstName = React.createRef();
    this.lastName = React.createRef();
  }

  _doCreateAccount = async history => {
    try {
      let r = await this.props.store.doCreateUser({
        email: this.email.current.value,
        password: this.password.current.value,
        firstName: this.firstName.current.value,
        lastName: this.lastName.current.value
      });

      if (r.code) {
        throw r;
      } else {
        history.push("/home");
      }
    } catch (e) {
      console.log(e);
      this.setState(() => ({ showErrorToast: true, errMsg: e.message }));
    }
  };

  render() {
    return (
      <>
        <BasicPage
          title="Create Account Page"
          hasMenu
          backAction={() => {}}
          renderContent={history => {
            return (
              <>
                <IonItem>
                  <IonLabel position="floating">Email Address</IonLabel>
                  <IonInput type="email" ref={this.email} name="email" />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">First Name</IonLabel>
                  <IonInput type="text" ref={this.firstName} name="firstName" />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Last Name</IonLabel>
                  <IonInput type="text" ref={this.lastName} name="lastName" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    ref={this.password}
                    name="password"
                  />
                </IonItem>
                <div style={{ padding: 8 }}>
                  <IonButton
                    expand="full"
                    style={{ margin: 14 }}
                    onClick={e => {
                      if (!e.currentTarget) {
                        return;
                      }
                      e.preventDefault();
                      this._doCreateAccount(history);
                    }}
                  >
                    Create Account
                  </IonButton>
                  <IonButton
                    expand="full"
                    style={{ margin: 14 }}
                    onClick={e => {
                      e.preventDefault();
                      history.goBack();
                    }}
                  >
                    Cancel
                  </IonButton>
                </div>
              </>
            );
          }}
        />
        <IonToast
          isOpen={this.state.showErrorToast}
          onDidDismiss={() => this.setState(() => ({ showErrorToast: false }))}
          message={this.state.errMsg}
          duration={2000}
        />
      </>
    );
  }
}

export default inject("store")(observer(RegistrationPage));

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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showErrorToast: false,
      errMsg: true
    };

    // see - https://reactjs.org/docs/uncontrolled-components.html
    this.email = React.createRef();
    this.password = React.createRef();
  }

  _doLogin = async history => {
    try {
      let r = await this.props.store.doLogin(
        this.email.current.value,
        this.password.current.value
      );

      if (r.code) {
        this.setState(() => ({ showErrorToast: true, errMsg: r.message }));
      } else {
        history.push("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let { doLogin, isAuth } = this.props.store;
    return (
      <>
        <BasicPage
          title="Login Page"
          hasMenu
          renderContent={history => {
            return (
              <>
                <IonItem lines="none">
                  <IonLabel>In Login Page</IonLabel>
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Email Address</IonLabel>
                  <IonInput type="email" ref={this.email} name="email" />
                </IonItem>
                <IonItem>
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput
                    type="password"
                    ref={this.password}
                    name="password"
                  />
                </IonItem>
                <div style={{ padding: 10, paddingTop:20 }}>
                  <IonButton
                    expand="full"
                    style={{margin:14}}
                    onClick={e => {
                      if (!e.currentTarget) {
                        return;
                      }
                      e.preventDefault();
                      this._doLogin(history);
                    }}
                  >
                    {isAuth ? "Logged In" : "Login"}
                  </IonButton>
                  <IonButton
                    expand="full"
                    style={{margin:14}}
                    onClick={e => {
                      e.preventDefault();
                      history.push("/register");
                    }}
                  >
                    Create Account
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

export default inject("store")(observer(LoginPage));

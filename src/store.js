import { observable, computed, action, decorate, runInAction } from "mobx";
import * as firebaseService from "./firebaseService";

export class Store {
  // this will hold the user object when we have one, we can subscribe
  // to changes of this object to determine of we are logged in or not
  activeUser;
  loading;

  constructor() {
    this.activeUser = null
    this.loading = false;
  }

  get doCheckAuth() {
    if (firebaseService.getCurrentUser()) {
      this.activeUser = Object.assign({}, this.user.details, {
        id: this.user.id
      });
    }
  }
  /**
   * here we check to see if ionic saved a user for us
   */
  get authenticatedUser() {
    return this.activeUser || null;
  }

  /**
   * login using a username and password
   */
  doLogin(_username, _password) {
    if (_username.length) {
      let details = { email: _username, password: _password };

      return firebaseService
        .loginWithEmail(_username, _password)
        .then(
          _result => {
            debugger;
            // create the user object based on the data retrieved...
            return runInAction(() => {
              this.activeUser = _result.user;
              return this.activeUser;
            });
          },
          err => {
            console.log(err);
            return err;
          }
        )
        .catch(e => {
          console.log(e);
          return e;
        });
    }
  }

  /**
   * create the user with the information and set the user object
   */
  doCreateUser(_params) {
    firebaseService
      .registerUser({
        email: _params.email,
        password: _params.password,
        username: _params.username
      })
      .then(
        () => {
          return this.doLogin(_params.email, _params.password);
        },
        err => {
          console.log(err);
          for (let e of err.details) {
            if (e === "conflict_email") {
              alert("Email already exists.");
            } else {
              // handle other errors
            }
          }
        }
      );
  }

  /**
   * logout and remove the user...
   */
  doLogout() {
    this.activeUser = null;
    return firebaseService.logOut();

  }
}

decorate(Store, {
  // OBSERVABLES
  activeUser: observable,
  loading: observable,

  // COMPUTED
  authenticatedUser: computed,
  doCheckAuth: computed,

  // ACTIONS
  doCreateUser: action,
  doLogin: action,
  doLogout: action,
  clearCart: action
});

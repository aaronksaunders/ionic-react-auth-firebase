import { observable, computed, action, decorate, runInAction } from "mobx";
import { get, set, entries } from "mobx";
import * as firebaseService from "./firebaseService";

export class Store {
  // this will hold the user object when we have one, we can subscribe
  // to changes of this object to determine of we are logged in or not
  activeUser;
  loading;
  items;

  constructor() {
    this.activeUser = null;
    this.loading = false;
    this.authCheckComplete = false;
    this.items = new Map();

    firebaseService.authCheck().then(_user => {
      return runInAction(() => {
        this.activeUser = _user;
        this.authCheckComplete = true;
        return this.activeUser;
      });
    });
  }

  get doCheckAuth() {
    if (firebaseService.getCurrentUser()) {
      return this.activeUser;
    }
  }
  /**
   * here we check to see if ionic saved a user for us
   */
  get authenticatedUser() {
    return this.activeUser || null;
  }

  get itemEntries() {
    return entries(this.items)
  }

  itemByKey(_key) {
    return get(this.items,_key)
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

  // DATA CRUD
  loadData() {
    return firebaseService
      .queryObjectCollection({ collection: "items" })
      .then(
        _result => {
          // create the user object based on the data retrieved...
          return runInAction(() => {
            let resultMap = _result.reduce((map, obj) => {
              map[obj.id] = obj;
              return map;
            }, {});
            this.items = resultMap;
            return resultMap;
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
  addItem(_data) {
    return firebaseService
      .addObjectToCollection({ collection: "items", objectData: _data })
      .then(
        _result => {
          // create the user object based on the data retrieved...
          return runInAction(() => {
            set(this.items, _result.id, _result);
            return _result;
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

decorate(Store, {
  // OBSERVABLES
  activeUser: observable,
  loading: observable,
  authCheckComplete: observable,
  items: observable,

  // COMPUTED
  authenticatedUser: computed,
  doCheckAuth: computed,
  itemEntries : computed,

  // ACTIONS
  doCreateUser: action,
  doLogin: action,
  doLogout: action,
  loadData: action,
  itemByKey: action
});

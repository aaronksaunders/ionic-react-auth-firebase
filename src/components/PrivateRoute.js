import React from "react";
import { Route, Redirect } from "react-router-dom";
import { inject } from "mobx-react";
const PrivateRoute = ({ store, component: Component, ...rest }) => {
  console.log(store.authenticatedUser)
  return (
    <Route
      {...rest}
      render={props =>
        store.authenticatedUser ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default inject("store")(PrivateRoute);

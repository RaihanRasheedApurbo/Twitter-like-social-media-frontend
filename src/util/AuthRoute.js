import React from "react";
import { Route, Redirect } from "react-router-dom";

// redux 
import {connect} from 'react-redux'




const AuthRoute = (props) => {
  const { component: Component, authenticated, ...rest } = props
  

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === true ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(AuthRoute);

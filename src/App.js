import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";

//mui
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
//import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeDefinition from "./util/theme";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//components
import Navbar from "./components/Navbar";

//util
import AuthRoute from "./util/AuthRoute";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import {SET_AUTHENTICATED, SET_UNAUTHENTICATED} from './redux/types'
import { logoutUser, getUserData } from './redux/actions/userAction'
import Axios from "axios";





const theme = createMuiTheme(themeDefinition);


const token = localStorage.FBIdToken;
if (token) {
  console.log("hi");
  const decodedToken = jwtDecode(token);
  console.log("hey tokennnnn");
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser())
    window.location.href = "/login";
   
  } else {
    store.dispatch({type: SET_AUTHENTICATED})
    Axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}
else {
  console.log("hey");
  store.dispatch({type: SET_UNAUTHENTICATED})
}

function App() {
  //console.log('app is called')
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Home} />
                <AuthRoute
                  exact
                  path="/login"
                  component={Login}
                  
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;

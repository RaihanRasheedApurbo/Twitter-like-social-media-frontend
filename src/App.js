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

const theme = createMuiTheme(themeDefinition);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  console.log("hi");
  const decodedToken = jwtDecode(token);
  console.log("hey tokennnnn");
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}
// else {
//   console.log("hey");
//   authenticated = false;
// }

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
                  authenticated={authenticated}
                />
                <AuthRoute
                  exact
                  path="/signup"
                  component={Signup}
                  authenticated={authenticated}
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

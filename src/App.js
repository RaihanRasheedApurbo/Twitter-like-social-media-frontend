import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from 'jwt-decode'

//mui
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
//import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeDefinition from "./util/theme"

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//components
import Navbar from "./components/Navbar";


//util
import AuthRoute from './util/AuthRoute'



const theme = createMuiTheme(themeDefinition);
 let authenticated;
 const token = localStorage.FBIdToken
 if(token){
   console.log('hi')
   const decodedToken = jwtDecode(token)
   console.log('hey token')
   console.log(decodedToken)
   if(decodedToken.exp * 1000 < Date.now()){
     window.location.href = '/login'
     authenticated = false
   }else{
     authenticated = true
   }
 }else{
   console.log('hey')
   authenticated = false
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login"  component={Login} />
              <Route exact path="/signup"  component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;

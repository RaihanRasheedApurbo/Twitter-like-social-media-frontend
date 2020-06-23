import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Logo from "../images/images.png";
import { Link } from "react-router-dom";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//redux stuff
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userAction'
// const styles = (theme) => ({
//   ...theme
// });
const styles = (theme) => {
  console.log("hye yoiwej")
  console.log(theme)
  return {...theme.spreadIt}
}


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors})
    }
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    console.log("inside submitto");
    const inputData = {
      email: this.state.email,
      password: this.state.password,
    };
    console.log(inputData.email);
    console.log(inputData.password);
    this.props.loginUser(inputData,this.props.history)
    // function loginuser
  };

  handleChange = (event) => {
    console.log('hey inside login handle change')
    this.setState({
      [event.target.name]: event.target.value,
    });
    // console.log(event.target.name)
    // console.log(event.target.value)
  };

  render() {
    const { classes, UI: {loading} } = this.props;
    const { errors } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={Logo} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            ></TextField>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              LOGIN
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              don't have an account? sign up {this.state.loading}  <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
      //   {/* // <div>
      //   //     <h1>Login page</h1>
      //   // </div> */}
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginUser 
}

export default connect( mapStateToProps, mapActionsToProps ) (withStyles(styles)(Login));

import React, { Component } from "react";
import axios from 'axios'
import PropTypes from 'prop-types'

//component
import Scream from '../components/Scream'
import Profile from '../components/Profile'


//mui export
import Grid from "@material-ui/core/Grid";

//redux stuffs
import { connect } from 'react-redux'
import { getScreams } from '../redux/actions/dataAction'

export class Home extends Component {
    state = {
        screams: null,
    }
    
  componentDidMount() {
    //axios.defaults.proxy.host = "https://us-central1-socialape-6fd1c.cloudfunctions.net/api"
    //console.log('hi')
    this.props.getScreams()

  }
  render() {
    const {screams, loading } = this.props.data
    let recentScreamMarkup
    if(!loading){
      // console.log(typeof(this.state.screams))
      //console.log((this.state.screams))
      // console.log(Object.keys(this.state.screams))
      
      // //console.log(this.state.screams.length)
      // console.log('hey')
      // const screams = this.state.screams
      // for(let i=0;i<screams.length;i++){

      // }
      recentScreamMarkup = screams.map(scream => {
       // console.log(scream)
      return <Scream key={scream.screamId} scream={scream}/>
      })
      // console.log(typeof(recentScreamMarkup))
      // console.log(Array.isArray(recentScreamMarkup))
      // console.log((recentScreamMarkup))
    }else{
      recentScreamMarkup = <p>"loading....."</p>
    }
    return (
      <Grid container spacing={6}>
        <Grid item sm={8} xs={12}>
          {recentScreamMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <Profile/>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps,{getScreams}) (Home);

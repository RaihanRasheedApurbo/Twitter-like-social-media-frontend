import React, { Component } from "react";
import axios from 'axios'

//component
import Scream from '../components/Scream'
import Profile from '../components/Profile'


//mui export
import Grid from "@material-ui/core/Grid";

export class Home extends Component {
    state = {
        screams: null,
    }
    
  componentDidMount() {
    //axios.defaults.proxy.host = "https://us-central1-socialape-6fd1c.cloudfunctions.net/api"
    //console.log('hi')
    axios.get('/screams')
        .then(res => {
            //console.log(res)
            this.setState({
                screams: res.data
            })
        })
        .catch( err => {
            console.log(err)
        })

  }
  render() {
    let recentScreamMarkup
    if(this.state.screams !== null){
      // console.log(typeof(this.state.screams))
      //console.log((this.state.screams))
      // console.log(Object.keys(this.state.screams))
      
      // //console.log(this.state.screams.length)
      // console.log('hey')
      // const screams = this.state.screams
      // for(let i=0;i<screams.length;i++){

      // }
      recentScreamMarkup = this.state.screams.map(scream => {
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

export default Home;

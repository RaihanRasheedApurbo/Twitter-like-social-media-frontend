import React, { Component } from "react";
import MyButton from '../../util/MyButton';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// redux
import {connect} from 'react-redux';
import {likeScream, unlikeScream} from '../../redux/actions/dataAction';


export class LikeButton extends Component {
  likedScream = () => {

    //console.log('hey inside likedScream')
    //console.log(this.props.user.likes)
    //console.log(this.props.user.likes)
    //console.log(this.props.scream.screamId)
    
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.screamId
      )
    ) {
      //console.log('true')
      return true;
    } else {
      //console.log('false')
      return false;
    }
  };

   likeScream = () => {
    console.log('hey inside likeScream in likeButtonjs')
    this.props.likeScream(this.props.screamId)
  }

   unlikeScream = () => {
    console.log('hey inside unlikeScream in screamjs')
    this.props.unlikeScream(this.props.screamId)
  }
  
  render() {
    const {authenticated} = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
      <MyButton tip="Like">
        
          <FavoriteBorder color="primary" />
        
      </MyButton>
      </Link>
    ) : this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Liky" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapActionsToProps = {
  likeScream,
  unlikeScream,
}

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);

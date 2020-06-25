import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Mui stuffs
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

//redux stuffs
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../redux/actions/dataAction";
import PropTypes from "prop-types";

//util
import MyButton from "../util/MyButton";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

//component
import DeleteScream from './DeleteScream'

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
};

class Scream extends Component {
  likedScream = () => {

    console.log('hey inside likedScream')
    console.log(this.props.user.likes)
    //console.log(this.props.user.likes)
    console.log(this.props.scream.screamId)
    
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.screamId === this.props.scream.screamId
      )
    ) {
      console.log('true')
      return true;
    } else {
      console.log('false')
      return false;
    }
  };

   likeScream = () => {
    console.log('hey inside likeScream in screamjs')
    this.props.likeScream(this.props.scream.screamId)
  }

   unlikeScream = () => {
    console.log('hey inside unlikeScream in screamjs')
    this.props.unlikeScream(this.props.scream.screamId)
  }

  


  render() {
    // console.log(this.likeScream)
    // this.likeScream()
    // console.log()
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        imageUrl,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: {
          handle,
        },
      }
    } = this.props;

  

    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary"/>
        </Link>
      </MyButton>
    ): (this.likedScream() ? (
      <MyButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary"/>
      </MyButton>
    ) : (<MyButton tip="Liky" onClick={this.likeScream}>
    <FavoriteBorder color="primary"/>
  </MyButton>))

    //console.log(likeButton)

    //console.log(classes);
    //console.log(imageUrl)
    //console.log(typeof(this.props.scream.createdAt))

    const deleteButton = authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId}/>

    ): null

    return (
      <Card className={classes.card}>
        {/* <CardMedia image={ImageUrl} title="Profile image"/> */}
        <CardMedia
          image={imageUrl}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/user/${userHandle}`}
          >
            {userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeScream,
  unlikeScream,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Scream));

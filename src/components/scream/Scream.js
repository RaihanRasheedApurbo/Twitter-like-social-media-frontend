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

import PropTypes from "prop-types";

//util
import MyButton from "../../util/MyButton";

//Icons
import ChatIcon from "@material-ui/icons/Chat";


//component
import DeleteScream from './DeleteScream'
import ScreamDialog from './ScreamDialog'
import LikeButton  from './LikeButton'


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
    //console.log(`here is scream id: ${screamId}`)

  

    

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
          <LikeButton screamId={screamId}/>
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
          {deleteButton}
          <ScreamDialog screamId={screamId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});



export default connect(
  mapStateToProps
  
)(withStyles(styles)(Scream));

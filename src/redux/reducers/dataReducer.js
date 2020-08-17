import {
  SET_SCREAMS,
  SET_SCREAM,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
} from "../types";
import { IconButton } from "@material-ui/core";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: actions.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: actions.payload,
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === actions.payload.screamId
      ); 
      state.screams[index] = actions.payload;
      state.scream = actions.payload;
      return {
        ...state,
      };
    case DELETE_SCREAM:
      let index1 = -1;
      for(let i=0;i<state.screams.length;i++)
      {
        let scream = state.screams[i]
        if(scream.screamId===actions.payload){
          index1 = i
          break
        }
      }
      //index = state.screams.findIndex(scream => scream.screamId === actions.payload)
      //console.log(index1)
      //console.log(state.screams[index1])
      state.screams.splice(index1, 1)
      return  {
        ...state
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          actions.payload,
          ...state.screams,
        ]
      }
    
      case SUBMIT_COMMENT:
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [actions.payload,...state.scream.comments]
          }
        }
    default:
      return state;
  }
}

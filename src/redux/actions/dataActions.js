import {
  LOADING_UI,
  ADD_POST,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_POSTS,
  LOADING_DATA,
} from "../types";
import axios from "axios";

export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/posts/")
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: [],
      });
    });
};

export const makePost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/posts/", newPost)
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data,
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

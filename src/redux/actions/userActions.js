import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

const setAuthorizationHeader = (token) => {
  const Token = `Token ${token}`;
  localStorage.setItem("Token", Token);
  axios.defaults.headers.common["Authorization"] = Token;
  //
  const Exp = new Date().getTime() + 98765432;
  localStorage.setItem("Expired", Exp);
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .get("http://127.0.0.1:8000")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("http://127.0.0.1:8000/", userData)
    .then((res) => {
      console.log(res);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("http://127.0.0.1/", newUserData)
    .then((res) => {
      console.log(res);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        
      });
    });
};



export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("Token");
  localStorage.removeItem("Expired");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

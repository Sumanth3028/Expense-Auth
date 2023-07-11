import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./AuthActionTypes";
import axios from "axios";
export const UserLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    let res = await axios.post(
      "http://localhost:4000/login",
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
    console.log(res);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data.idToken });
    localStorage.setItem("token", JSON.stringify(res.data.idToken));
    localStorage.setItem("email", JSON.stringify(res.data.email));
  } catch (error) {
    alert("Login Failed");
    dispatch({ type: USER_LOGIN_ERROR });
    console.log(error);
  }
};

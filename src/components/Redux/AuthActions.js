import axios from "axios";
import {
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from "./AuthActionTypes";
import { useDispatch } from "react-redux";
export const UserLogin = (email, password)=>async(dispatch) => {
   
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    let res = await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSf-ElfBk_z7q902i-D2AJidG1e6X6Vyg",
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
    console.log( error);
  }
};
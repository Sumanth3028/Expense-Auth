import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLogin } from "../Redux/AuthActions";

const LoginForm = () => {
  // const [login,setLogin]=useState(false)'
  const dispatch = useDispatch();
  const email = useRef("");
  const password = useRef("");
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    axios
      .post("http://localhost:5000/login", {
        email: emailValue,
        password: passwordValue,
        returnSecureToken: true,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("email", res.data.email);

          alert("login Successful");
          navigate("/dummy");
          return res;
        } else {
          return res.then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(data.error.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });

    // if(email==='' || password===''){
    //   alert('please fill all fields')
    // }
    // else
    // {
    //   dispatch(UserLogin(emailValue,passwordValue))
    // }
  };

  return (
    <div className="  bg-hero-pattern h-full py-[170px]">
      <div className="text-3xl ml-[50px]  text-white">
        <Link to="/" className="text-white">Back</Link>
      </div>

      <div className="py-0 ">
        <Card
          style={{
            width: "50rem",
            height: "32rem",
            alignItems: "inherit",
            background: "transparent",
            borderRadius: "10px",
            borderColor: "black",
            marginLeft:'35rem'
          }}
          className="bg-transparent bg-opacity-90 backdrop-blur-lg rounded-md border"
        >
          <header
            style={{
              textAlign: "center",
              fontSize: "2rem",
              color: "white",
              borderRadius: "20px",
              marginTop: "2rem",
              fontFamily: "bold",
              marginBottom:'1rem'
            }}
          >
            Login to your Account
          </header>
          <Form
            style={{ alignItems: "center", marginTop: "0.3rem" }}
            onSubmit={submitHandler}
            className="mt-3 text-left"
          >
            <FormGroup controlId="formBasicEmail">
              <FormLabel
                style={{
                  fontSize: "1.5rem",
                  textAlign: "left",
                  marginLeft: "6rem",
                  color: "white",
                }}
              >
                Email Id:
              </FormLabel>

              <FormControl
                type="email"
                placeholder="enter email"
                style={{
                  width: "70%",
                  marginLeft: "6rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
                ref={email}
                required
              ></FormControl>
            </FormGroup>
            <FormGroup controlId="formBasicPassword">
              <FormLabel
                style={{
                  fontSize: "1.5rem",
                  textAlign: "left",
                  marginLeft: "6rem",
                  color: "white",
                  
                }}
              >
                Password:
              </FormLabel>
              <FormControl
                type="password"
                placeholder=" Enter password"
                style={{
                  width: "70%",
                  marginLeft: "6rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
                ref={password}
                required
              ></FormControl>
            </FormGroup>
            <Button
              variant="primary"
              type="submit"
              style={{
                marginTop: "2rem",
                marginLeft: "14rem",
                width: "40%",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              login
            </Button>
          </Form>
        </Card>

        <p className="text-white text-xl ml-[830px]">Forgot Your Password</p>
        <Link
          to={"/forgotpassword"}
          className=" text-xl text-blue-400  ml-[550px] px-[300px] py-[220px]"
        >
          forgot password
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;

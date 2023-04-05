import React, { Fragment } from "react";
import { Routes,Route } from "react-router-dom";
import SignUpForm from "./components/Auth/SignUpForm";
import LoginForm from "./components/Auth/LoginForm";

import CompleteForm from "./components/Auth/Pages/CompleteForm";
import ForgotPassword from "./components/Auth/Pages/ForgotPassword";
import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import Dummy from "./components/Auth/Pages/Dummy" 

function App() {

  return (
    <div style={{background:'black',height:'930px',width:'100%'}} >
      <Routes>
        <Route path='/' element={<SignUpForm/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/dummy' element={<PrivateRoutes><Dummy /></PrivateRoutes>}/>
        <Route path='/profile' element={<PrivateRoutes><CompleteForm /></PrivateRoutes>} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
      </Routes>
      
    </div>
  );
}

export default App;

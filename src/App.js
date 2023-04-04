import React, { Fragment } from "react";
import { Routes,Route } from "react-router-dom";
import SignUpForm from "./components/Auth/SignUpForm";
import LoginForm from "./components/Auth/LoginForm";
import Dummy from "./components/Auth/Pages/Dummy";
import CompleteForm from "./components/Auth/Pages/CompleteForm";
function App() {

  return (
    <div style={{background:'black',height:'930px',width:'100%',marginTop:'0rem'}} >
      <Routes>
        <Route path='/' element={<SignUpForm/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/dummy' element={<Dummy/>}></Route>
        <Route path='/profile' element={<CompleteForm />} />
      </Routes>
      
    </div>
  );
}

export default App;

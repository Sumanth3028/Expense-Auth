import React,{useRef, useState} from 'react'
import axios from "axios"
import { Button, Card, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { UserLogin } from '../Redux/AuthActions'

const LoginForm = () => {
    // const [login,setLogin]=useState(false)'
    const dispatch=useDispatch()
    const email=useRef('')
    const password=useRef('')
    const navigate=useNavigate()
    const submitHandler=async(event)=>{
        event.preventDefault()
        const emailValue=email.current.value
        const passwordValue=password.current.value
        axios.post('http://localhost:4000/login',{
          
        
              email:emailValue,
              password:passwordValue,
              returnSecureToken:true
          
      }).then((res) => {
        
        if (res.status===200) {
        
          console.log('successful')
          console.log(res)
          navigate('/dummy')
          return res;
        } else {
          
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
         
        }
      })
      .then((data) => {
         console.log(data)
         localStorage.setItem("email" ,JSON.stringify(data.email))
         localStorage.setItem("token",data.idToken)
        
      })
      .catch((error) => {
        alert(error.message);
      });
        
      if(email==='' || password===''){
        alert('please fill all fields')
      }
      else 
      {
        dispatch(UserLogin(emailValue,passwordValue))
      }
    }
    
  return (
    <div className="h-full"> 
    
    <div className='py-40' >

    
     <Card  style={{ width:'50rem',height:'32rem',alignItems:'inherit',background:'azure',borderRadius:'20px',borderColor:'black',margin:'auto'}}>
    <header style={{textAlign:'center',fontSize:'3rem',color:"black",borderRadius:'20px',marginTop:"2rem",fontFamily:'bold'}}>Login</header>
  <Form style={{alignItems:'center',marginTop:'0.3rem'}} onSubmit={submitHandler} >
    <FormGroup controlId="formBasicEmail">
      <FormLabel style={{fontSize:'2rem',textAlign:'left',marginLeft:'3rem',color:'black'}}>Email Id:</FormLabel>
     
      <FormControl type="email"  placeholder="enter email" style={{width:'80%',marginLeft:'3rem',padding:'1rem',marginBottom:'1rem'}} ref={email} required></FormControl>
    </FormGroup>
    <FormGroup  controlId="formBasicPassword">
      <FormLabel style={{fontSize:'2rem',textAlign:'left',marginLeft:'3rem',color:'black'}}>Password:</FormLabel>
      <FormControl type="password" placeholder=" Enter password" style={{width:'80%',marginLeft:'3rem',padding:'1rem',marginBottom:'1rem'}} ref={password} required></FormControl>
    </FormGroup>
   <Button variant="primary" type="submit" style={{marginTop:'2rem',marginLeft:'13rem',width:"40%",padding:'1rem',marginBottom:'1rem'}}>login</Button>

  </Form>
 
</Card>

<p className='text-white text-xl ml-[830px]'>Forgot Your Password</p><Link to={'/forgotpassword'} className=' text-xl text-blue-400  ml-[550px] px-[300px] py-[220px]'>forgot password</Link>
</div>
</div>
  )
}

export default LoginForm
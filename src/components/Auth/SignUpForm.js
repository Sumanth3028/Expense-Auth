import React ,{useRef, useState} from "react";
import { Form, FormControl, FormGroup, FormLabel,Card,Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
   const [successful,isSuccessful]=useState(false)
   const [error,setError]=useState(false)
   const email=useRef()
   const password=useRef()
   const confirm=useRef()
  const navigate=useNavigate()

    const submitHandler=async(event)=>{
      event.preventDefault()
        const emailValue=email.current.value 
        const pwdValue=password.current.value 
        const confirmValue=confirm.current.value
        if(pwdValue!==confirmValue){
          setError(true)
        }
        else{
          setError(false)
          
         
          let res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSf-ElfBk_z7q902i-D2AJidG1e6X6Vyg',{
            method:"POST",
            body:JSON.stringify({
               email:emailValue,
               password:pwdValue,
             
               returnSecureToken:true
            }), headers:{
              "content-Type":"application/json"
          }
          
          })
          console.log(res)
          let data
          if(res.ok)
          {
            isSuccessful(true)
            setTimeout(()=>{
              navigate('/login')
            },1000)
            
            return res.json()

            
            
          }
          
          

          else
          {
             data =await res.json()
            let errorMessage="Authentication failed"
            alert(data.error.message)
             throw new Error(errorMessage)
           
          }
                   
        
          
          
        }
         
        
        
    }
   
   
  return (
    <div >
   
    <div className="py-20" >
    <Card style={{ width:'50rem',height:'40rem',alignItems:'inherit',background:'azure',borderRadius:'20px',borderColor:'black',margin:'auto'}}>
        <header style={{textAlign:'center',fontSize:'3rem',color:"black",borderRadius:'20px',marginTop:"2rem",fontFamily:'bold'}}>Sign Up</header>
      <Form style={{alignItems:'center',marginTop:'0.3rem'}}  onSubmit={submitHandler}>
        <FormGroup  controlId="formBasicEmail">
          <FormLabel style={{fontSize:'2rem',textAlign:'left',marginLeft:'3rem'}}>Email Id:</FormLabel>
         
          <FormControl type="email"  placeholder="enter email" style={{width:'80%',marginLeft:'3rem',padding:'1rem',marginBottom:'1rem'}} ref={email} required></FormControl>
        </FormGroup>
        <FormGroup  controlId="formBasicPassword">
          <FormLabel style={{fontSize:'2rem',textAlign:'left',marginLeft:'3rem'}}>Password:</FormLabel>
          <FormControl type="password" placeholder=" Enter password" style={{width:'80%',marginLeft:'3rem',padding:'1rem',marginBottom:'1rem'}} ref={password} required></FormControl>
        </FormGroup>
        <FormGroup  controlId="formBasicConfirmPassword">
          <FormLabel style={{fontSize:'2rem',textAlign:'left',marginLeft:'3rem'}}>Confirm Password:</FormLabel>
          <FormControl type="password"   placeholder=" Confirm password" style={{width:'80%',marginLeft:'3rem',padding:'1rem',marginBottom:'1rem'}} ref={confirm} required></FormControl>
          {error && <p style={{fontSize:'1rem',color:'red',marginLeft:'5rem'}}>Password and confirm password did'nt match</p>}
          {successful && <p style={{fontSize:'1rem',color:'blue',marginLeft:'5rem'}}>Account created successfully</p> }
        </FormGroup>
       <Button variant="primary" type="submit" style={{marginTop:'2rem',marginLeft:'13rem',width:"40%",padding:'1rem'}}>Submit</Button>
      </Form>
      <p style={{fontSize:'20px',paddingTop:'46px',textAlign:'center',color:'white'}}>Already Have an Account? <a href="/login">Login</a></p>
    </Card>
    
    </div>
   
    

    </div>
   
  );
};

export default SignUpForm;

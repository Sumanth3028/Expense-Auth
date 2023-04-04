import React, { useRef, useState } from 'react'
import New from '../../../assets/new.jpg'
import axios from 'axios'
const ForgotPassword = () => {
    const [success,setSucess]=useState(false)
    const emailRef=useRef()
    const submitHandler=async(e)=>{
         e.preventDefault()
         try{
         const email=emailRef.current.value

        let response= await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCSf-ElfBk_z7q902i-D2AJidG1e6X6Vyg',{
            requestType: "PASSWORD_RESET",
            email: email,
        })

        console.log(response)
        setSucess(true)
    }
    catch(error){
        alert(error.message)
    }
    emailRef.current.value=""
    }
  return (
    <div className='bg-hero h-full py-[100px] items-start'>
     
         {/* <img src={New}></img> */}
        <div className=' bg-white   flex  justify-center  w-[300px] ml-[390px]  px-[440px] py-[100px]  rounded-3xl'>
        
            <form onSubmit={submitHandler} >
             <header className='text-4xl font-bold text-center  rounded mb-[80px] '>Enter Email Details</header> 
                <label className='text-2xl  font-bold text-start mb-4'> Email Id:</label>
                <input type='email' placeholder='enter your email' className='w-[630px] text-center text-xl  px-5 py-2 border-3 border-black rounded mb-3' required ref={emailRef}></input>
                {success && <p className='text-l text-center'>Change Password Link sent successfully</p>}
                <button type='submit' className='bg-red-500 px-9 py-4 w-[200px] my-3 rounded-2xl mx-[200px] text-xl font-semibold'>submit</button>
                
            </form>
        </div>
    </div>
    
  )
}

export default ForgotPassword
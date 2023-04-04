import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { GoMarkGithub } from "react-icons/go";
import { HiGlobeAlt } from "react-icons/hi";

const CompleteForm = () => {
  const [success,setSuccess]=useState(false)
  const fullNameRef = useRef();
  const profileRef = useRef();
  const idtoken1 = localStorage.getItem("token");
  //   const [userData, setUserData ]= useState()

  const gettingFormData = async () => {
    
    let response=await axios.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCSf-ElfBk_z7q902i-D2AJidG1e6X6Vyg",
      {
      
       
          idToken: idtoken1,
        })
       
      if (response) {
         //fullNameRef.current.value=sometempvar.users
        //console.log(data.data.users[0].displayName)
        fullNameRef.current.value=response.data.users[0].displayName
        profileRef.current.value=response.data.users[0].photoUrl
        console.log(response.data)
     
         } 
         else {
        const error = "authentication failed";
        alert(error);
    }
  
  }
  useEffect(() => {
   
    gettingFormData()
   
  }, []);
  const submitHandler = async (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const profile = profileRef.current.value;

    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSf-ElfBk_z7q902i-D2AJidG1e6X6Vyg",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: idtoken1,
          displayName: fullName,
          photoUrl: profile,
          returnSecureToken: true,
        }),
        headers: {
          "content-Type": "application/json",
        },
      }
    );
    let data;
    if (res.ok) {
      // console.log('apple', res.displayName)
      setSuccess(true)
      return res.json();
    } else {
      data = res.json();
      let errorMessage = "Authentication failed";

      alert(errorMessage);
    }
  };
  return (
    <div className=" bg-white h-full ">
      <div className=" flex  px-10 py-10 w-full text-black text-xl italic justify-between">
        <div>
          <p>Winners never quit, Quitters never win</p>
        </div>
        <div className="bg-gray-200 px-2 py-1  w-[500px] rounded overflow-hidden">
          <p>
            Your profile is 64% completed.A complete profile has high chances of
            landing a job.
            <span className="text-blue-500">Complete Now</span>
          </p>
        </div>
      </div>
      {/* line  */}
      <div className="bg-black h-[1px] w-full "></div>

      <div className="flex justify-end">
        <div className=" w-[1000px] flex justify-between mx-10 my-3">
          {" "}
          <header className="text-2xl font-semibold ">Contact Details:</header>
          <button className=" border-red-600 border-2 rounded text-lg font-semibold  text-red-600 px-6 py-1 ">
            Cancel
          </button>
        </div>
      </div>

      {/* {userData.map((li)=> (
        <p>{li.users[0].email}</p>
      ))} */}

      <div className="flex justify-end">
        <div className=" flex flex-col">
          {/* ele 1  */}
          <form
            className=" w-[1000px] mx-10 my-3  font-bold"
            onSubmit={submitHandler}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center ">
                <GoMarkGithub className="text-2xl mx-2 px-0" />
                <label className="">Full Name:</label>
                <input
                  className="border-2 ml-5 rounded w-[350px]"
                  type="text"
                  ref={fullNameRef}
                  required
                ></input>
              </div>

              <div className="flex items-center">
                <HiGlobeAlt className="text-3xl mx-2 px-0" />
                <label className="">Profile URL:</label>
                <input
                  className="border-2 ml-5 rounded w-[350px]"
                  type="text"
                  ref={profileRef}
                  required
                ></input>
              </div>
             
            </div>
           

            {/* <Button variant="danger">update</Button> */}
            <button
              className="bg-red-500 rounded my-4 py-1 px-4 text-white font-medium"
              type="submit"
            >
              Update
            </button>
            {success && <p>updated successfully</p>}
          </form>
          {/* {userData} */}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-black h-[1px] w-[1050px]  "></div>
      </div>
    </div>
  );
};

export default CompleteForm;

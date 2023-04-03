import React, { useEffect, useState } from "react";

const Dummy = () => {
    const [token,setToken]=useState()
  const loctoken = localStorage.getItem("token");

  useEffect(()=> {
    setTimeout(()=>{
        setToken(loctoken)
    },0)
    
    console.log('hello')
  }, [token])
  console.log(token);
  return (
    // bg color

    <div className="h-full bg-white text-black">
      {/* div 1 if not logged in */}
      {!token && <div>
        <p>Not Logged in</p>
      </div> }
      
      {/* div 2  , logged in */}
      {token && <div className="h-full">
        <div className="bg-white h-full  px-10 py-10 w-full text-black text-3xl">
          <div className="flex justify-between">
            <div> Welcome to Expense Tracker</div>
            <div className=" text-xl ">
              <p>
                Your Profile is Incomplete.<a href="/profile">Complete Now</a>
              </p>
            </div>
          </div>
          <div className="bg-black h-[1px] w-full "></div>
        </div>
      </div>}
      
    </div>
  );
};

export default Dummy;

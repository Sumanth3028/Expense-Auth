import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import AbstractModalHeader from "react-bootstrap/esm/AbstractModalHeader";
import axios from "axios";
const Dummy = () => {

  let [items  , setItems ] = useState( [])


  const [token, setToken] = useState();
  const amountRef = useRef();
  const descRef = useRef();
  const selectRef = useRef();
  const loctoken = localStorage.getItem("token");
  const emailId = localStorage.getItem("email");
  const email=emailId.replace('@','').replace(".","")
  useEffect(() => {
    setTimeout(() => {
      setToken(loctoken);
    }, 0);

    // console.log("hello");
  }, [token]);
  const submitHandler = async(e) => {
    e.preventDefault();
    try {
    
    let result=await axios.post(`https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}.json`,{
      amount: amountRef.current.value,
      description: descRef.current.value,
      select: selectRef.current.value,
    })
     console.log(result.data.name)

    setItems(result.data)
    //  console.log(result.data.name)
    getData()
  } catch(error){
    console.log(error.message)
  }
  };
  const getData=async()=>{
    try {
     
      let result = await axios.get(
        `https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}.json`
      );
      setItems( result.data)
      
      
    } catch (error) {
    
      console.log("error:", error);
    }
  }
   const newItems=[]
    for(let key in items)
    {
      const obj={
        id:key,
        ...items[key]
      }
      newItems.push(obj)
    }


    useEffect(()=>{
      getData()
    },[])
  return (
    // bg color

    <div className="h-full bg-white text-black">
      {/* div 1 if not logged in */}
      {!token && (
        <div>
          <p>Not Logged in</p>
        </div>
      )}

      {/* div 2  , logged in */}
      {token && (
        <div className="h-full">
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
            <div className="bg-gray-400 mx-10 my-5 h-full">
              <header className="text-black font-bold text-center text-4xl  py-[60px]">
                Expense Form
              </header>
              <form
                className="bg-red-400 rounded overflow-hidden py-5"
                
              >
                <label className="mr-3 text-2xl ml-[80px]">Money Spent:</label>
                <input
                  type="number"
                  className="rounded mr-5"
                  ref={amountRef}
                  required
                ></input>
                <label className="mr-3 text-2xl">Description:</label>
                <input
                  type="text"
                  className="rounded mr-5"
                  ref={descRef}
                  required
                ></input>
                <label className="mr-3 text-2xl">Select Category:</label>
                <select ref={selectRef} className=" mr-14  w-[210px] h-[40px]">
                  <option value="Food">Food</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Petrol">Petrol</option>
                </select>
                <button
                onClick={submitHandler}
                  type="submit"
                  className="text-2xl bg-yellow-300 border-2 rounded px-4 py-2"
                >
                  Submit
                </button>
              </form>
             
              {newItems.map((item) => (
                <div  key={Math.random()}>
                  <Table striped bordered variant="dark" >
                  <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Category</th>
                    {/* <th>Delete Expense</th>
                    <th>Edit Expense</th> */}
                  </tr>
                </thead>
                   <tbody >
                    <tr>
                      <td>{item.amount}</td>
                      <td>{item.description}</td>
                      <td>{item.select}</td>
                    </tr>
                  
                  </tbody>
                 </Table>
                </div>
                 
                 
                
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dummy;

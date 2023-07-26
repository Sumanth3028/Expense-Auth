import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import jwt from "jwt-decode";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../Context/theme";
import { CSVLink } from "react-csv";
import Modal from "../Modal/Modal";
const Dummy = () => {
  const [items, setItems] = useState([]);
  const [leaderBoardMembers, setLeaderBoardMembers] = useState([]);
  const [editId, setEditId] = useState(undefined);
  const [token, setToken] = useState();
  const [premium, setPremium] = useState(false);
  const ctx = useContext(ThemeContext);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = async () => {
    setModalIsOpen(true);
    let token = localStorage.getItem("token");
    let res = await axios.get("http://localhost:5000/showLeaderBoard", {
      headers: { Authorization: token },
    });

    let result = res.data.users;
    console.log(result);
    setLeaderBoardMembers([...result]);

    // }
  };

  // console.log(leaderBoardMembers);

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const amountRef = useRef();

  const descRef = useRef();

  const selectRef = useRef();

  const loctoken = localStorage.getItem("token");

  const emailId = localStorage.getItem("email");
  const email = emailId.replace("@", "").replace(".", "");

  useEffect(() => {
    setTimeout(() => {
      setToken(loctoken);
    }, 0);
  }, []);

  const razorpayHandler = async (e) => {
    // const rzp1=new window.Razorpay("options")

    // // rzp1.open()
    const token = localStorage.getItem("token");

    const response = await axios.get(
      "http://localhost:5000/purchaseMembership",
      { headers: { Authorization: token } }
    );

    console.log(response);

    var options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (response) {
        const res = await axios.post(
          "http://localhost:5000/updateMembership",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        setPremium(true);
        alert("You are a premium user now");
        localStorage.setItem("token", res.data.token);
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed", function (response) {
      alert("something went wrong");
    });
  };

  const submitHandler = async (e, id) => {
    e.preventDefault();
    if (
      amountRef.current.value === "" ||
      descRef.current.value === "" ||
      selectRef.current.value === ""
    ) {
      alert("please fill all fields");
    } else {
      try {
        let result = await axios.post(
          "http://localhost:5000/expense/postdetails",
          {
            amount: amountRef.current.value,
            description: descRef.current.value,
            select: selectRef.current.value,
          },
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        console.log(result.data);

        setItems(result.data.data);
        //  console.log(result.data.name)
        // amountRef.current.value = "";
        // descRef.current.value = "";
        // selectRef.current.value = "";
        getData();
      } catch (error) {
        console.log(error.message);
      }

      //  else {
      //   console.log(editId);

      //   try {
      //     let res = await axios.get(
      //       `http://localhost:5000/expense/editDetails/`,
      //       {
      //         amount: amountRef.current.value,
      //         description: descRef.current.value,
      //         select: selectRef.current.value,
      //       },
      //       { headers: { Authorization: localStorage.getItem("token") } }
      //     );
      //     console.log(res);
      //     getData();
      //     setEditId(undefined);
      //   } catch (error) {
      //     console.log("error:", error);
      //   }
    }
  };
  const getData = async () => {
    try {
      let result = await axios.get(`http://localhost:5000/expense/getdetails`, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      setItems(result.data.expense);
      let decoded = jwt(loctoken);

      let isAdmin = decoded.isPremiumUser;

      if (isAdmin) {
        setPremium(true);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const newItems = [];
  for (let key in items) {
    const obj = {
      id: key,
      ...items[key],
    };
    newItems.push(obj);
  }

  useEffect(() => {
    getData();
  }, []);

  const editHandler = async (amount, description, select) => {
    let result;

    try {
      result = await axios.put(
        `http://localhost:5000/expense/editdetails`,
        {
          amount: amount,
          description: description,
          select: select,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log(result);
      getData();
    } catch (error) {
      console.log("error:", error);
    }
    amountRef.current.value = result.Amount;
    descRef.current.value = result.Description;
    selectRef.current.value = result.Categories;

    // if (
    //   amountRef.current.value === amount ||
    //   descRef.current.value === description ||
    //   selectRef.current.value === select
    // ) {
    //   return;
    // }
  };

  const deleteHandler = (id) => {
    try {
      getData();

      let result = axios.delete(
        `http://localhost:5000/expense/deleteDetails/${id}`,
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      getData();
      console.log(result);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const total = newItems.reduce((accumulator, curNum) => {
    return Number(curNum.Amount) + accumulator;
  }, 0);

  // const makeCsv = (newItems) => {
  //   return newItems.map((r) => r).join("\n");
  // };

  // const download=()=>{
  //   const a1=document.createElement('a1')
  //   const blob1=new Blob([makeCsv(newItems)])
  //   a1.href=URL.createObjectURL(blob1)
  //   a1.download='yes.csv'
  //   console.log(a1)
  //   a1.click()
  // }
  // const csv = { data: newItems };

  const downloadHandler=async()=>{
    let result = await axios.post('http://localhost:5000/expense/downloadExpenses')

    console.log(result)
  }

  return (
    // bg color

    <div>
      {/* div 1 if not logged in */}
      {!token && (
        <div>
          <p>Not Logged in</p>
        </div>
      )}

      {/* div 2  , logged in */}
      {token && (
        <div className="h-full bg-black">
          <div className=" h-full  px-10 py-10 w-full text-3xl">
            <div className="flex justify-between">
              <div> Welcome to Expense Tracker</div>
              <div className=" text-xl ">
                <p>
                  Your Profile is Incomplete.<a href="/profile">Complete Now</a>
                </p>
              </div>
            </div>
            {/* <div className="bg-black h-[200px] w-full "></div> */}
            <div className="bg-gray-400 mx-10 my-5 h-full w-[1700px]">
              <header className="text-black font-bold text-center text-[60px]  py-[60px]">
                Expense Form
              </header>

              <div className=" flex justify-between text-end ml-5 mr-10 px-2 my-1 font-bold ">
                Total Expense: {total}
                {/* {total >= 10000 && ( */}
                {!premium && (
                  <button
                    // onClick={ctx.handleTheme}
                    onClick={razorpayHandler}
                    className="ml-8 bg-blue-300 rounded py-2 px-2 text-black text-xl"
                  >
                    Activate Premium
                  </button>
                )}
                {/* )} */}
                {premium && (
                  <div className="flex">
                    {" "}
                    <span className=" bg-black text-3xl text-yellow-400 border-2 rounded-lg px-1 py-1  border-black">
                      Premium
                    </span>
                    <button
                      className="text-xl ml-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      onClick={handleOpenModal}
                    >
                      Show LeaderBoard
                    </button>
                  </div>
                )}
              </div>

              <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
                {" "}
                {/* <h2 className="text-xl text-black font-bold mb-4">hey gusy</h2> */}
                {leaderBoardMembers.map((mem) => (
                  <div className="text-xl text-black font-bold mb-4">
                    <li>
                      {mem.email}-{mem.Total_Expenses}
                    </li>
                  </div>
                ))}
              </Modal>

              <form className="bg-red-400 rounded overflow-hidden py-5 ">
                <label className="mr-3 text-2xl ml-[80px]">Money Spent:</label>
                <input
                  type="number"
                  className="rounded mr-5 text-black"
                  ref={amountRef}
                  required
                ></input>
                <label className="mr-3 text-2xl">Description:</label>
                <input
                  type="text"
                  className="rounded mr-5 text-black"
                  ref={descRef}
                  required
                ></input>
                <label className="mr-3 text-2xl">Select Category:</label>
                <select
                  ref={selectRef}
                  className=" mr-14  w-[210px] h-[40px] text-black"
                  required
                >
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
                <div key={item.id}>
                  <Table striped bordered variant="dark">
                    <thead>
                      <tr className="text-xl">
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Delete Expense</th>
                        {/* <th>Edit Expense</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-xl">
                        <td>{item.Amount}</td>
                        <td>{item.Description}</td>
                        <td>{item.Categories}</td>
                        <td>
                          <button
                            className="bg-red-400 ml-4 rounded"
                            onClick={() => deleteHandler(item.id)}
                          >
                            Delete Expense
                          </button>
                        </td>
                        {/* <td>
                          <button
                            onClick={()=>
                              editHandler(item.Amount,item.Description,item.Categories)
                              
                            }
                            className="bg-red-400 ml-4 rounded"
                          >
                            Edit Expense
                          </button>
                        </td> */}
                      </tr>
                    </tbody>
                  </Table>
                </div>
              ))}
            </div>

            <div>
              {/* <button
                onClick={download}
                download="file.csv"
             
              >
                Download Csv File
              </button> */}
              {premium &&
                <button
                  className="text-m bg-white text-black rounded ml-[1490px] px-2 py-2 "
                  onClick={downloadHandler}
                >
                  Download File
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dummy;

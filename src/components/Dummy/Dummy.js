import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../Context/theme";
import { CSVLink } from "react-csv";
const Dummy = () => {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(undefined);
  const [token, setToken] = useState();
  const ctx = useContext(ThemeContext);

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

    // console.log("hello");
  }, [token]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      amountRef.current.value === "" ||
      descRef.current.value === "" ||
      selectRef.current.value === ""
    ) {
      alert("please fill all fields");
    } else {
      if (editId === undefined) {
        try {
          let result = await axios.post(
            `https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}.json`,
            {
              amount: amountRef.current.value,
              description: descRef.current.value,
              select: selectRef.current.value,
            }
          );
          // console.log(result.data.name);

          setItems(result.data);
          //  console.log(result.data.name)
          // amountRef.current.value = "";
          // descRef.current.value = "";
          // selectRef.current.value = "";
          getData();
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log(editId);

        try {
          let res = await axios.put(
            `https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}/${editId}.json`,
            {
              amount: amountRef.current.value,
              description: descRef.current.value,
              select: selectRef.current.value,
            }
          );
          console.log(res);
          getData();
          setEditId(undefined);
        } catch (error) {
          console.log("error:", error);
        }
      }
    }
  };
  const getData = async () => {
    try {
      let result = await axios.get(
        `https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}.json`
      );
      setItems(result.data);
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

  const editHandler = (amount, description, select) => {
    amountRef.current.value = amount;
    descRef.current.value = description;
    selectRef.current.value = select;

    if (
      amountRef.current.value === amount ||
      descRef.current.value === description ||
      selectRef.current.value === select
    ) {
      return;
    }
  };

  const deleteHandler = async (id) => {
    try {
      let res = await axios.delete(
        `https://expense-19d0e-default-rtdb.firebaseio.com/cart/${email}/${id}.json`
      );
      getData();
      console.log("deleted");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const total = newItems.reduce((accumulator, curNum) => {
    return Number(curNum.amount) + accumulator;
  }, 0);

  const makeCsv = (newItems) => {
    return newItems.map((r) => r).join("\n");
  };

  // const download=()=>{
  //   const a1=document.createElement('a1')
  //   const blob1=new Blob([makeCsv(newItems)])
  //   a1.href=URL.createObjectURL(blob1)
  //   a1.download='yes.csv'
  //   console.log(a1)
  //   a1.click()
  // }
  const csv = { data: newItems };
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
        <div className="h-full ">
          <div className=" h-full  px-10 py-10 w-full text-3xl">
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
              <div className="text-end mr-10 px-3 my-2 font-bold ">
                Total Expense:{total}
                {total >= 10000 && (
                  <button
                    onClick={ctx.handleTheme}
                    className="ml-8 bg-white rounded py-2 text-black"
                  >
                    Activate Premium
                  </button>
                )}
              </div>

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
                      <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Delete Expense</th>
                        <th>Edit Expense</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>{item.select}</td>
                        <td>
                          <button
                            className="bg-red-400 ml-4 rounded"
                            onClick={() => deleteHandler(item.id)}
                          >
                            Delete Expense
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              editHandler(
                                item.amount,
                                item.description,
                                item.select,
                                setEditId(item.id)
                              )
                            }
                            className="bg-red-400 ml-4 rounded"
                          >
                            Edit Expense
                          </button>
                        </td>
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
              <CSVLink className="text-m bg-white text-black rounded ml-[1490px] "{...csv}>Download File</CSVLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dummy;

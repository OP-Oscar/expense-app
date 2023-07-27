import React from "react";
import { useState, useContext, useRef } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./ExpenseForm.module.css";


//date func
const today = new Date();
const pastDay = new Date(new Date().setDate(today.getDate() - 365));
const futureDay = new Date(new Date().setDate(today.getDate() + 365));
const minDate = pastDay.toISOString().split("T")[0];
const maxDate = futureDay.toISOString().split("T")[0];
const currentDate = today.toISOString().split("T")[0];

function IncomeForm() {
    const [incomeName, setIncomeName] = useState("");
    const [amount, setAmount] = useState("");
    const [incomeDate, setIncomeDate] = useState(currentDate);
    const { userId } = useContext(AuthContext);
    const formRef = useRef(null);
  
    const authCtx = useContext(AuthContext);
  
    const submitHandler = (e) => {
      e.preventDefault();
      formRef.current.reset();
      setIncomeDate(currentDate);
  
      //    setDisplay('none')
  
      const body = {
        income_name: incomeName,
        amount,
        income_date: incomeDate,
        user_id: userId,
      };
  
      const url = "http://localhost:5050";
  
      axios
        .post(`${url}/addIncome`, body)
        .then(({ data }) => {
          console.log(`Submit handler in expenseform.js actioned`, data);
          setIncomeName("");
          setAmount("");
          setIncomeDate(currentDate);
          authCtx.catSelector('');
        })
        .catch((err) => {
          console.log(`error message from expense submit handler`, err.message);
          setIncomeName("");
          setAmount("");
          setIncomeDate(currentDate);
          authCtx.catSelector('');
        });
  
      console.log("submitHandler in incomeform called");
    };
  
    return (
      <div>
        <h2>Add Income</h2>
        <div>
          <form ref={formRef} onSubmit={submitHandler}>
            <div>
              <label htmlFor="incName">Income Name:</label>
              <input
                type="text"
                id="incomeName"
                value={incomeName}
                onChange={(ele) => setIncomeName(ele.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="incDate">Income Date:</label>
              <input
                type="date"
                id="incomeDate"
                value={incomeDate}
                min={minDate}
                max={maxDate}
                onChange={(ele) => setIncomeDate(ele.target.value)}
              ></input>
            </div>
  
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                step="0.01"
                id="amount"
                value={amount}
                onChange={(ele) => {
                  //making sure only two decimal spaces
                  if (ele.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
                  setAmount(ele.target.value)}}}
                required
              />
            </div>
            <button type="submit">Add Income</button>
          </form>
        </div>
      </div>
    );
  }

export default IncomeForm
import React from 'react'
import { useState, useContext } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";

import CategoryDropDown from './CategoryDropDown'

import styles from "./ExpenseForm.module.css";

function ExpenseForm() {
    const [expenseName, setExpenseName] = useState("");
    const [amount, setAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const {userId} = useContext(AuthContext)
 

    const submitHandler = (e) => {
        e.preventDefault();
    
        //    setDisplay('none')
    
        const body = {
          expenseName,
          amount,
          expenseDate,
          categoryId,
          user_id: userId
        };
    
        const url = "http://localhost:5050";
    
        axios
          .post(`${url}/addexpense`, body)
          .then(({ data }) => {
            console.log(`Submit handler in Auth.js actioned`, data);
          })
          .catch((err) => {
            console.log(`error message from expense submit handler`, err.message);
            setExpenseName("");
            setAmount("");
            setExpenseDate("");
            setCategoryId("");
          });
    
        console.log("submitHandler in expenseform called");
      };


  return (
    <div>
      <h2>Add Expense --in progress--</h2>
        <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="expName">Expense Name:</label>
          <input
            type="text"
            id="expenseName"
            value={expenseName}
            onChange={(ele) => setExpenseName(ele.target.value)}
            required
          />
        </div>
        <div>
            <CategoryDropDown/>
        </div>
        {/* <div>
        <label htmlFor="expName">Expense Date:</label>
        <input type="date" id="datePicker" name="trip-start"
       value="2023-05-25"
       min="2023-05-25" max="2024-12-31">
       </input>
        </div> */}

        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            step="any"
            id="amount"
            value={amount}
            onChange={ (ele) => setAmount(ele.target.value)}
            required
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>


    </div>
  )
}

export default ExpenseForm
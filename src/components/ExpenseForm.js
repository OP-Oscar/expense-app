import React from "react";
import { useState, useContext, useRef } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./ExpenseForm.module.css";

//category drop down module
import CategoryDropDown from "./CategoryDropDown";

//date func
const today = new Date();
const pastDay = new Date(new Date().setDate(today.getDate() - 365));
const futureDay = new Date(new Date().setDate(today.getDate() + 365));
const minDate = pastDay.toISOString().split("T")[0];
const maxDate = futureDay.toISOString().split("T")[0];
const currentDate = today.toISOString().split("T")[0];


function ExpenseForm() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState(currentDate);
  const { userId, selectedCategory } = useContext(AuthContext);
  const formRef = useRef(null);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();
    formRef.current.reset();
    setExpenseDate(currentDate);

    //    setDisplay('none')

    const body = {
      expense_name: expenseName,
      amount,
      expense_date: expenseDate,
      category_id: selectedCategory,
      user_id: userId,
    };

    const url = "http://localhost:5050";

    axios
      .post(`${url}/addexpense`, body)
      .then(({ data }) => {
        console.log(`Submit handler in expenseform.js actioned`, data);
        setExpenseName("");
        setAmount("");
        setExpenseDate(currentDate);
        authCtx.catSelector('');
      })
      .catch((err) => {
        console.log(`error message from expense submit handler`, err.message);
        setExpenseName("");
        setAmount("");
        setExpenseDate(currentDate);
        authCtx.catSelector('');
      });

    console.log("submitHandler in expenseform called");
  };

  return (
    <div>
      <h2>Add Expense</h2>
      <div>
        <form ref={formRef} onSubmit={submitHandler}>
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
            <CategoryDropDown />
          </div>
          <div>
            <label htmlFor="expDate">Expense Date:</label>
            <input
              type="date"
              id="expenseDate"
              value={expenseDate}
              min={minDate}
              max={maxDate}
              onChange={(ele) => setExpenseDate(ele.target.value)}
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
          <button type="submit">Add Expense</button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;

import React from "react";
import { useState, useContext, useRef } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./ExpenseForm.module.css";
import { Alert, TextInput, Label, Button} from "flowbite-react";

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
  const [alertMessage, setAlertMessage] = useState(null);
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
        authCtx.catSelector("");
        setAlertMessage(data);
        // Clear the alert after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
      })
      .catch((err) => {
        console.log(`error message from expense submit handler`, err.message);
        setExpenseName("");
        setAmount("");
        setExpenseDate(currentDate);
        authCtx.catSelector("");
      });

    console.log("submitHandler in expenseform called");
  };

  return (
    <div className={styles.expense_form}>
      {alertMessage && (
        <Alert color="success" onDismiss={() => setAlertMessage(null)}>
          <span>
            <p>
              <span className="font-medium">{alertMessage}</span>
            </p>
          </span>
        </Alert>
      )}
      <h2 className={styles.expense_title}>Add Expense</h2>
      <br />
      <div>
        <form className="flex max-w-md flex-col gap-4" ref={formRef} onSubmit={submitHandler}>
          <div>
            <div className="mb-2 block">
            <Label htmlFor="expName">Expense Name:</Label>
            </div>
            <TextInput
              type="text"
              id="expenseName"
              value={expenseName}
              onChange={(ele) => setExpenseName(ele.target.value)}
              required
            />
          </div>

            <CategoryDropDown />


          <div>
          <div className="mb-2 block">
            <Label htmlFor="expDate">Expense Date:</Label>
            </div>
            <TextInput
              type="date"
              id="expenseDate"
              value={expenseDate}
              min={minDate}
              max={maxDate}
              onChange={(ele) => setExpenseDate(ele.target.value)}
            ></TextInput>
          </div>

          <div>
          <div className="mb-2 block">
            <Label htmlFor="amount">Amount:</Label>
            </div>
            <TextInput
              type="number"
              step="0.01"
              id="amount"
              value={amount}
              onChange={(ele) => {
                //making sure only two decimal spaces
                if (ele.target.value.match(/^(\d*\.{0,1}\d{0,2}$)/)) {
                  setAmount(ele.target.value);
                }
              }}
              required
            />
          </div>
          <Button type="submit"
              className="bg-blue-700 hover:bg-blue-800 active:bg-blue-50"
            >Add Expense</Button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;

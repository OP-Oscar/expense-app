import React from "react";
import { useState, useContext, useRef } from "react";
import AuthContext from "../store/authContext";
import axios from "axios";
import styles from "./IncomeForm.module.css"
import { Alert, Button, Label, TextInput } from "flowbite-react";


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
    const [alertMessage, setAlertMessage] = useState(null);
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
          setAlertMessage(data);
          // Clear the alert after 3000 milliseconds (3 seconds)
          setTimeout(() => {
            setAlertMessage(null);
          }, 3000);
        })
        .catch((err) => {
          console.log(`error message from expense submit handler`, err.message);
          setIncomeName("");
          setAmount("");
          setIncomeDate(currentDate);
          authCtx.catSelector('');
        });
  
      console.log("submitHandler in income form called");
    };
  
    return (
      <div className={styles.income_form}>
        <h2 className={styles.income_title}>Add Income</h2>
        <br />
        {alertMessage && (
        <Alert color="success" onDismiss={() => setAlertMessage(null)}>
          <span>
            <p>
              <span className="font-medium">{alertMessage}</span>
            </p>
          </span>
        </Alert>
      )}
        <div>
          <form className="flex max-w-md flex-col gap-4" ref={formRef} onSubmit={submitHandler}>
            <div>
            <div className="mb-2 block">
            <Label htmlFor="incName">Income Name:</Label>
            </div>
              <TextInput
                type="text"
                id="incomeName"
                value={incomeName}
                onChange={(ele) => setIncomeName(ele.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
            <Label htmlFor="incDate">Income Date:</Label>
            </div>
              <TextInput
                type="date"
                id="incomeDate"
                value={incomeDate}
                min={minDate}
                max={maxDate}
                onChange={(ele) => setIncomeDate(ele.target.value)}
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
                  setAmount(ele.target.value)}}}
                required
              />
            </div>
            <Button type="submit"
              className="bg-blue-700 hover:bg-blue-800 active:bg-blue-50"
            >Add Income</Button>
          </form>
        </div>
      </div>
    );
  }

export default IncomeForm
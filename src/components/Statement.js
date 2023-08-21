import React, {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import styles from './Statement.module.css'
import {Button,} from "flowbite-react";

function Statement() {
  const [userStatement, setuserStatement] = useState([])
  const {userId, token } = useContext(AuthContext);
  const url = "http://localhost:5050";

  const getUserStatement = useCallback(() => {
    axios.get(`${url}/statement/${userId}`, { headers: {authorization: token}})
        .then(res => setuserStatement(res.data))
        .catch(err => console.log(err))
}, [userId, token])

useEffect(() => {
  getUserStatement()
}, [getUserStatement])

const deleteTransaction = (x) => {
  console.log(`deleteTransaction front end got ${x}`)
  axios.delete(`${url}/delete/${x}`, { headers: {authorization: token}} )
  .then(() => {getUserStatement()})
  .catch(err => {
    console.log(err)
  })
}
const mappedIncome = userStatement.map(ele => {
  return (
      <div className={styles.statement_div} key={ele.id} value={ele.id} >
          <h4 className={styles.statement_date_data}>{ele.date}</h4>
          <h4 className={styles.statement_transaction_data}>{ele.name}</h4>
          <h4 className={styles.statement_amount_data}>{ele.id.slice(-1)=== `c` ? `+`.concat(parseFloat(ele.amount).toLocaleString('en')) : `-`.concat(parseFloat(ele.amount).toLocaleString('en'))}</h4>
          <h4 className={styles.statement_balance_data}>{ele.balance}</h4>
          <div className={styles.btn_container}>
            <Button type="submit"
              className="h-5 w-16 bg-blue-800 hover:bg-gray-900 active:bg-blue-50"
             onClick={() => deleteTransaction(ele.id)}>delete</Button>
            </div>
          
      </div>
  )
})


  return (
    <div>
        <h1 className={styles.statement_title}>Statement</h1>
        <br />
        <div className={styles.statement_div}>
        <h3 className={styles.statement_date}>Date</h3>
        <h3 className={styles.statement_transaction}>Transaction</h3>
        <h3 className={styles.statement_amount}>Amount</h3>
        <h3 className={styles.statement_balance}>Balance</h3>
        <div className={styles.btn_container}/>
        </div>
        <div className={styles.statement_div_main}>{mappedIncome}</div>
        
    </div>
  )
}

export default Statement
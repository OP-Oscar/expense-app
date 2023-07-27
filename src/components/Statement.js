import React, {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'

function Statement() {
  const [userExpense, setuserExpense] = useState([])
  const { userId } = useContext(AuthContext);
  const url = "http://localhost:5050";

  const getUserExpense = useCallback(() => {
    axios.get(`${url}/income/${userId}`)
        .then(res => setuserExpense(res.data))
        .catch(err => console.log(err))
}, [userId])

useEffect(() => {
  getUserExpense()
}, [getUserExpense])

const mappedIncome = userExpense.map(ele => {
  return (
      <div key={ele.income_id} >
          <h2>{ele.income_name}</h2>
          <h4>{ele.income_date}</h4>
          <h4>{ele.amount}</h4>
      </div>
  )
})


  return (
    <div>
        <h1>Statement view in progress</h1>
        <p>{mappedIncome}</p>
        
    </div>
  )
}

export default Statement
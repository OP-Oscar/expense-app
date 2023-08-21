import React, {useState, useEffect, useContext, useCallback} from 'react'
import axios from 'axios'
import { useSpring, animated } from 'react-spring'
import AuthContext from '../store/authContext'
import styles from './Balance.module.css'



function Balance()  {
  const [userStatement, setuserStatement] = useState([])
  const {userId, token } = useContext(AuthContext);
  const url = "http://localhost:5050";

  const getUserStatement = useCallback(() => {
    axios.get(`${url}/statement/${userId}`, { headers: {authorization: token}})
        .then(res => setuserStatement(res.data[0].balance))
        .catch(err => console.log(err))
}, [userId, token])

useEffect(() => {
  getUserStatement()
}, [getUserStatement])

  const {number} = useSpring({
    from: {number: 0},
    number: +userStatement,
    delay: 100,
    config: {mass: 1, tension:20, friction:10}
  })
  return (

  <div className={styles.balance_div}> 
    $
  <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>
  </div>

  )
};

export default Balance;

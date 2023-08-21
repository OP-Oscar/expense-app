import React, {useContext} from 'react'
import AuthContext from '../store/authContext'

import styles from './FormToggle.module.css'


function FormToggle() {
    const authCtx = useContext(AuthContext);
  return (
    <div>
  <label className={styles.toggle} defaultChecked={authCtx.isToggled} onChange={authCtx.toggleSelector}>
    <input type="checkbox"/>
    <span className={styles.slider}></span>
    <span className={styles.labels} data-on="Income" data-off="Expense"></span>
  </label>
  </div>


  )
}

export default FormToggle
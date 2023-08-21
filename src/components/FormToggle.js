import React, {useContext} from 'react'
import AuthContext from '../store/authContext'

import styles from './FormToggle.module.css'


function FormToggle() {
    const authCtx = useContext(AuthContext);
  return (
    <div>
  <button
            className={styles.link_button}
            onClick={authCtx.toggleSelector}
          >
           {authCtx.isToggled ? 'Add An Expense Instead' : 'Add An Income Instead'}
          </button>

  </div>


  )
}

export default FormToggle
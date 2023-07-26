import React from 'react'
import styles from './Form.module.css'

function Form() {
  return (
    <div>
        
        <h1>Form Input --work in prog</h1>
        <button
            className={styles.link_button}
            onClick={() => setRegister(!register)}
          >
            Create an account
          </button>    
    </div>
  )
}

export default Form
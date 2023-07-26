import React, {useState, useContext} from 'react'
import AuthContext from '../store/authContext'
import styles from './FormPick.module.css'

//React components
import FormToggle from './FormToggle';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';


function FormPick() {
    const authCtx = useContext(AuthContext);
    const {isToggled} = authCtx
    const [addingExpense, setAddingExpense] = useState(true);
  return (
    <div>
        <FormToggle/>
        <br />
        {!isToggled ? 
        <ExpenseForm/>
        :
        <IncomeForm/>

        }

    </div>
  )
}

export default FormPick
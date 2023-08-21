import React, { useContext } from "react";
import AuthContext from "../store/authContext";
import styles from "./FormPick.module.css";
import {Card} from "flowbite-react";

//React components
import FormToggle from "./FormToggle";
import ExpenseForm from "./ExpenseForm";
import IncomeForm from "./IncomeForm";

function FormPick() {
  const authCtx = useContext(AuthContext);
  const { isToggled } = authCtx;
  // const [addingExpense, setAddingExpense] = useState(true);
  return (
    <main>
      <Card>
      {!isToggled ?  <ExpenseForm /> : <IncomeForm />}
      <br />

      <FormToggle />
      </Card>
    </main>
  );
}

export default FormPick;

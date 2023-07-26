import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";

import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    //    setDisplay('none')

    const body = {
      username,
      f_name: firstname,
      l_name: lastname,
      password,
    };

    const url = "http://localhost:5050";

    axios
      .post(register ? `${url}/register` : `${url}/login`, body)
      .then(({ data }) => {
        console.log(`Submit handler in Auth.js actioned`, data);
        authCtx.login(data.token, data.exp, data.userId);
      })
      .catch((err) => {
        alert('Username Or Password Incorrect')
        console.log(`error message from submit handler`, err.message);
        setPassword("");
        setUsername("");
        setFirstname("");
        setLastname("");
      });

    console.log("submitHandler called");
  };

  return (
    <main>
      {!register ? (
        <form
          className={`${styles.form} ${styles.auth_form_sign}`}
          onSubmit={submitHandler}
        >
          <h1>Welcome Back!</h1>
          <input
            className={styles.form_input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(ele) => setUsername(ele.target.value)}
          />
          <input
            className={styles.form_input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ele) => setPassword(ele.target.value)}
          />
          <button className={styles.form_btn}>Login</button>

          <button
            className={styles.link_button}
            onClick={() => setRegister(!register)}
          >
            Create an account
          </button>
        </form>
      ) : (
        <form
          className={`${styles.form} ${styles.auth_form}`}
          onSubmit={submitHandler}
        >
          <h1>Get Started</h1>
          <input
            className={styles.form_input}
            type="text"
            placeholder="firstname"
            value={firstname}
            onChange={(ele) => setFirstname(ele.target.value)}
          />

          <input
            className={styles.form_input}
            type="text"
            placeholder="lastname"
            value={lastname}
            onChange={(ele) => setLastname(ele.target.value)}
          />

          <input
            className={styles.form_input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(ele) => setUsername(ele.target.value)}
          />

          <input
            className={styles.form_input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(ele) => setPassword(ele.target.value)}
          />
          <button className={styles.form_btn}>Sign Up</button>

          <button
            className={styles.link_button}
            onClick={() => setRegister(!register)}
          >
            Already have account?
          </button>
        </form>
      )}
    </main>
  );
};

export default SignInForm;

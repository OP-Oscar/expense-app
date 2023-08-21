import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../store/authContext";
import { Button, TextInput, Card, Alert } from "flowbite-react";

import styles from "./SignInForm.module.css";
import { hover } from "@testing-library/user-event/dist/hover";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

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
        // alert(register ? err.response.data:`Username Or Password Incorrect` )
        setAlertMessage(
          register ? err.response.data : `Username Or Password Incorrect`
        );
        // Clear the alert after 3000 milliseconds (3 seconds)
        setTimeout(() => {
          setAlertMessage(null);
        }, 5000);
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
        <Card>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={submitHandler}
          >
            <h1>Welcome Back!</h1>
            {alertMessage && (
              <Alert color="failure" onDismiss={() => setAlertMessage(null)}>
                <span>
                  <p>
                    <span className="font-medium">{alertMessage}</span>
                  </p>
                </span>
              </Alert>
            )}
            <TextInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(ele) => setUsername(ele.target.value)}
              required
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ele) => setPassword(ele.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 active:bg-blue-50"
            >
              Login
            </Button>

            <button
              className={styles.link_button}
              onClick={() => setRegister(!register)}
            >
              Create an account
            </button>
          </form>
        </Card>
      ) : (
        <Card>
          <form
            className="flex max-w-md flex-col gap-4 "
            onSubmit={submitHandler}
          >
            <h1>Get Started</h1>
            {alertMessage && (
              <Alert color="failure" onDismiss={() => setAlertMessage(null)}>
                <span>
                  <p>
                    <span className="font-medium">{alertMessage}</span>
                  </p>
                </span>
              </Alert>
            )}
            <TextInput
              type="text"
              placeholder="firstname"
              value={firstname}
              onChange={(ele) => setFirstname(ele.target.value)}
              required
            />

            <TextInput
              type="text"
              placeholder="lastname"
              value={lastname}
              onChange={(ele) => setLastname(ele.target.value)}
              required
            />

            <TextInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={(ele) => setUsername(ele.target.value)}
              required
            />

            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(ele) => setPassword(ele.target.value)}
              required
            />
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 active:bg-blue-50"
            >
              Sign Up
            </Button>

            <button
              className={styles.link_button}
              onClick={() => setRegister(!register)}
            >
              Already have account?
            </button>
          </form>
        </Card>
      )}
    </main>
  );
};

export default SignInForm;

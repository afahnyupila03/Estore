// TODO: USE FORMIK INSTEAD OF THE TRADITIONAL FORM ELEMENTS
// TODO: IMPLEMENT THROTTLING OR DEBOUNCING TO STOP RE-RENDER LISTENING TO EVERY KEY STROKE.

import { useState } from "react";
import Modal from "../../Components/UI/Modal";

const Login = () => {
  const path = window.location.pathname;

  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')

  const emailChangeHandler = e => setEnteredEmail(e.target.value)
  const passwordChangeHandler = e => setEnteredPassword(e.target.value)

  const submitHandler= event => {
    event.preventDefault()
    console.log(enteredEmail, enteredPassword)
    setEnteredEmail("")
    setEnteredPassword("")
  }

  return (
    <div
      style={{
        backgroundImage:
          path === "/login" || path === "/signup"
            ? 'url("./auth-bgImage.jpeg")'
            : null,
      }}
    >
      <Modal>
        <form onSubmit={submitHandler} className="items-center">
          <div>
            <label>email</label>
            <input
              className="rounded ml-2 "
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              className="rounded ml-2"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
          </div>
          <button
            className="bg-red-200 p-2 rounded text-white"
          >
          Login
          </button>
          <div>
            <p>Already have an account ?</p>
            <button>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Login;

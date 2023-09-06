import React from "react";

import { Icon } from "react-icons-kit";
import {user} from 'react-icons-kit/fa/user';

const Login = ({ isLogin, onLogin, onLogout }) => {
  return (
    <div>
      {isLogin ? (
        <button onClick={onLogout}>
          <Icon icon={user} size={30} style={{ color: "white" }} />
          <h1 style={{ color: "white" }}>user Name</h1>
        </button>
      )  : (
        <button className='row-reverse' onClick={onLogin}>
          <Icon icon={user} size={30} style={{ color: "white" }} />
          <h1 style={{ color: "white" }}>Sign in</h1>
        </button>
      )}
    </div>
  );
};

export default Login;

import React from "react";

import { Icon } from 'react-icons-kit';
import {ic_login_twotone} from 'react-icons-kit/md/ic_login_twotone'

const Login = () => {
  return (
    <div>
      <h1 style={{ color: "white" }}>Login</h1>
      <Icon icon={ic_login_twotone} size={30} style={{ color: "white" }} />
      
    </div>
  );
};

export default Login;

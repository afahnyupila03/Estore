import { useReducer } from "react";
import { AuthReducer, defaultAuthState } from "../Reducers";
import { AuthContext } from "./AuthContext";

const AuthProvider = () => {
  const [authState, dispatchAuthState] = useReducer(
    AuthReducer,
    defaultAuthState
  );
  const signupHandler = (email, password) => {
    // Make an API call to sign up the user using the email and password
    // Once the API call is successful, update the auth state with the user's email and password
    dispatchAuthState({
      type: "SIGNUP",
      email: email,
      password: password,
    });
  };

  const loginHandler = (email, password) => {
    // Make an API call to log in the user using the email and password
    // Once the API call is successful, update the auth state to indicate that the user is logged in
    dispatchAuthState({
      type: "LOGIN",
      email: email,
      password: password,
    });
  };

  const logoutHandler = () => {
    // Make an API call to log out the user
    // Once the API call is successful, update the auth state to indicate that the user is logged out
    dispatchAuthState({
      type: "LOGOUT",
    });
  };

  const authValue = {
    login: loginHandler,
    signup: signupHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

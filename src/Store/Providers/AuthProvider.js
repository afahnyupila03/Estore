import { useEffect, useReducer } from "react";
import { AuthContext } from "../Context/AuthContext";
import { DefaultAuthState, AuthReducer } from "../Reducers/AuthReducer";
import { Constants } from "../Constants";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from "firebase/auth";
import { auth } from "../../FirebaseConfigs/Firesbase";

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, DefaultAuthState);

  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: Constants.SET_USER,
          payload: { user },
        });
      } else {
        dispatch({
          type: Constants.SIGN_OUT,
        });
      }
    });

    return () => unSubscribed;
  }, []);

  const signUpHandler = async (email, password, firstName, lastName) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredentials.user, {
        displayName: `${firstName} ${lastName}`,
      });

      dispatch({
        type: Constants.SIGN_UP,
        payload: { user: userCredentials.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signInHandler = async (email, password) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: Constants.SIGN_IN,
        payload: { user: userCredentials.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const reAuthUser = async (email, password) => {
    try {
      const user = auth.currentUser;
      const authCredentials = EmailAuthProvider.credential(email, password);
      const reAuthUser = await reauthenticateWithCredential(
        user,
        authCredentials
      );
      dispatch({
        type: Constants.SIGN_IN,
        payload: { user: reAuthUser.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const updateCurrentUserName = async (firstName, lastName) => {
    try {
      const currentUser = auth.currentUser;
      const updateCurrentUserName = await updateProfile(currentUser, {
        displayName: `${firstName} ${lastName}`,
      });
      dispatch({
        type: Constants.SET_USER,
        payload: { user: updateCurrentUserName.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const updateCurrentUserEmail = async (newEmail) => {
    try {
      const currentUser = auth.currentUser;
      const newUserEmail = await updateEmail(currentUser, newEmail);
      dispatch({
        type: Constants.SET_USER,
        payload: { user: newUserEmail.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const updateCurrentUserPassword = async (newPassword) => {
    try {
      const currentUser = auth.currentUser;
      const updateUserPassword = await updatePassword(currentUser, newPassword);
      dispatch({
        type: Constants.SET_USER,
        payload: { user: updateUserPassword.user },
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const deleteCurrentUserAccount = async () => {
    try {
      const user = auth.currentUser;
      await user.delete();
      // await deleteUser();
      dispatch({
        type: Constants.DELETE,
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const signOutHandler = async () => {
    try {
      await auth.signOut();
      dispatch({
        type: Constants.SIGN_OUT,
      });
    } catch (error) {
      dispatch({
        type: Constants.ERROR,
        payload: { error },
      });
      throw error;
    }
  };

  const value = {
    user: state.user,
    error: state.error,
    signOutHandler,
    signUpHandler,
    signInHandler,
    reAuthUser,
    updateCurrentUserName,
    updateCurrentUserEmail,
    updateCurrentUserPassword,
    deleteCurrentUserAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

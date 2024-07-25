import { Constants } from "../Constants";

export const DefaultAuthState = {
  user: null,
  error: null,
};

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case Constants.SIGN_UP:
    case Constants.SIGN_IN:
      return {
        ...state,
        user: action.payload.user,
        error: null,
      };
    case Constants.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case Constants.SIGN_OUT:
      return {
        ...state,
        user: null,
        error: null,
      };
    case Constants.ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case Constants.RESET_PASSWORD:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

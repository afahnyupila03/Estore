import React from 'react';

export const AuthContext = React.createContext({
    login: (email, password) => {},
    signup: (email, password) => {},
    logout: () => {}
})
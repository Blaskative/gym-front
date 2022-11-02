import React from "react";
import { createContext, useState } from "react";

const AuthContext =  React.createContext<any | null>({});

type Props = { children: JSX.Element};

export const AuthProvider: React.FC<Props>  = ({ children }) => {
    const [auth, setAuth] = useState(() =>
      localStorage.getItem("user")
      ? localStorage.getItem("user")
      : null);

    return (
        <AuthContext.Provider value={{auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
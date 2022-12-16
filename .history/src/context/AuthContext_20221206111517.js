import React from "react";

const AuthContext = React.createContext();

export function useContext() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

import React, { useContext, createContext } from "react";

export const TweetContext = createContext();

export function useTweetContext() {
  return useContext(TweetContext);
}

export function TweetContextProvider({ children }) {
  const credentials = {
    username: "Roie",
    password: "12345",
  };
  return (
    <TweetContext.Provider value={{ credentials }}>
      {children}
    </TweetContext.Provider>
  );
}

import React, { useContext, createContext } from "react";

export const TweetContext = createContext();

export function useTweetContext() {
  return useContext(TweetContext);
}

export function TweetContextProvider({ children }) {
  const credentials = {
    username: "Roie",
  };
  return (
    <TweetContext.Provider value={{ credentials }}>
      {children}
    </TweetContext.Provider>
  );
}

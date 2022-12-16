import { createContext, useState } from "react";

export const TweetContext = createContext();

export function TweetProvider({ children }) {
  // const [posts, setPosts] = useState(true)
  const abba = "HELLO WORLD!";
  return <TweetContext.Provider value={abba}>{children}</TweetContext.Provider>;
}

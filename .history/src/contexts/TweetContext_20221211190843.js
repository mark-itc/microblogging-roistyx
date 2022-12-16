import { createContext, useState } from "react";

export const TweetContext = createContext();

export function TweetProvider(children) {
  // const [posts, setPosts] = useState(true)
  return (
    <TweetContext.Provider value={"Hello world!"}>
      {children}
    </TweetContext.Provider>
  );
}

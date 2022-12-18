import { React, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import TweetBox from "./TweetBox";
import "./Feed.css";
import { getDocs } from "firebase/firestore/lite";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";
export default function Feed() {
  const [loading, setLoading] = useState(true);
  const { tweetRender, setTweetRender, tweetMessage, setTweetMessage } =
    useContext(TweetContext);
  const { currentUser, postCollection } = useAuth();
  const { posts, setPosts, tweet, picUrl } = useContext(TweetContext);
  const navigate = useNavigate();

  console.log("picUrl", picUrl);

  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data());
      var sorted = [...tweetList].sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });

      console.log("sorted", sorted);
      setPosts(sorted.reverse());
      // console.log("date",posts[0].date)
    }
    getTweetList();
  }, [tweetMessage]);

  return (
    <>
      {currentUser ? (
        <div className="feed">
          <TweetBox username={currentUser.email} />
          {loading
            ? ""
            : posts.map((post) => (
                <Post
                  displayName={post.username}
                  text={post.text}
                  date={post.date}
                  avatar={picUrl}
                  uid={post.uid}
                />
              ))}
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
}

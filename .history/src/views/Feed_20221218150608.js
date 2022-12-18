import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import TweetBox from "./TweetBox";
import "./Feed.css";
import { getDocs } from "firebase/firestore/lite";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";

export default function Feed() {
  const { currentUser, postCollection } = useAuth();
  const { posts, setPosts, tweet, loading, setLoading } =
    useContext(TweetContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getTweetList() {
      try {
        const { docs } = await getDocs(postCollection);
        setLoading(false);
        const tweetList = docs.map((doc) => doc.data());
        const sorted = [...tweetList].sort(function (a, b) {
          return a.date.localeCompare(b.date);
        });
        setPosts(sorted.reverse());
      } catch (e) {
        console.log("Tweets could not load", e);
      }
    }
    getTweetList();
  }, [tweet]);

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
                  avatar={post.avatar}
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

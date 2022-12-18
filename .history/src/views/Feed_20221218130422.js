import { React, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import TweetBox from "./TweetBox";
import "./Feed.css";
import { getDocs } from "firebase/firestore/lite";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext } from "../contexts/TweetContext";
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";
import app from "../firebase";

export default function Feed() {
  const { currentUser, postCollection } = useAuth();
  const {
    posts,
    setPosts,
    tweet,
    userUrl,
    setUserId,
    picUrl,
    getProfilePic,
    loading,
    setLoading,
  } = useContext(TweetContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getTweetList() {
      try {
        const { docs } = await getDocs(postCollection);

        setLoading(false);
        const tweetList = docs.map((doc) => doc.data());
        var sorted = [...tweetList].sort(function (a, b) {
          return a.date.localeCompare(b.date);
        });
        setPosts(sorted.reverse());
      } catch (e) {
        console.log("Tweets could not load", e);
      }
    }
    getTweetList();
  }, [tweet]);

  getProfilePic(userUrl);

  // console.log("userUrl", userUrl);

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
                  avatar={getProfilePic()}
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

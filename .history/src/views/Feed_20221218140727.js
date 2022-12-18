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

const storage = getStorage(app);

export default function Feed() {
  const { currentUser, postCollection } = useAuth();
  const {
    posts,
    setPosts,
    tweet,
    userUrl,
    setUserUrl,
    picUrl,
    loading,
    setLoading,
    setPicUrl,
  } = useContext(TweetContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getTweetList() {
      try {
        const { docs } = await getDocs(postCollection);

        setLoading(false);
        const tweetList = docs.map((doc) => doc.data());

        const newTeeetList = tweetList.map((doc) => getProfilePic(doc.uid));
        const a = newTeeetList.then((res) => {
          return res;
        });
        console.log("", a);

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

  async function getProfilePic(userId) {
    if (!currentUser) return;
    const listRef = ref(storage, `/`);

    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            if (url.includes(userId)) {
              // console.log("posts", url);
              setUserUrl(url);
            }
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
    return;
  }

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
                  avatar={userUrl}
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

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
  const [loading, setLoading] = useState(true);
  const { currentUser, postCollection } = useAuth();
  const { posts, setPosts, tweet, picUrl, setPicUrl } =
    useContext(TweetContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    const listRef = ref(storage, `/`);

    listAll(listRef)
      .then((res) => {
        console.log("res", res);
        res.prefixes.forEach((folderRef) => {
          console.log("folderRef", folderRef);
        });
        res.items.forEach((itemRef) => {
          console.log("itemRef", itemRef);
          getDownloadURL(itemRef).then((url) => {
            console.log("", url);
            console.log("currentUser.uid", currentUser.uid);
            if (url.includes(currentUser.uid)) {
              setPicUrl(url);
            }
          });
        });
      })
      .catch((error) => {
        console.log("error", error);
      });
  });

  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetList = docs.map((doc) => doc.data());
      var sorted = [...tweetList].sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });
      setPosts(sorted.reverse());
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

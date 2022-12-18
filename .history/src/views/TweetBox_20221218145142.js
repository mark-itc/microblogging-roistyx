import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { TweetPosterContext } from '../components/TweetPosterContext'
import { format } from "date-fns";
import Button from "@mui/material/Button";
import "./TweetBox.css";
import app from "../firebase";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore/lite";
import { ref, getDownloadURL, listAll, getStorage } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext, ACTIONS } from "../contexts/TweetContext";

const storage = getStorage(app);

export default function TweetBox() {
  const { currentUser } = useAuth();
  const { tweetMessage, setTweetMessage, setUserUrl, tweet, date, dispatch } =
    useContext(TweetContext);

  async function getProfilePic(userId) {
    if (!currentUser) return;
    const listRef = ref(storage, `/`);

    listAll(listRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            if (url.includes(userId)) {
              console.log("posts", userId);
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

  async function sendUserTweet(tweetMessage) {
    dispatch({
      type: ACTIONS.ADD_TWEET,
      payload: {
        // avatar: "https://placekitten.com/200/287",
        date: date,
        text: tweetMessage,
        username: currentUser.email,
        uid: currentUser.uid,
        avatar: getProfilePic(currentUser.uid),
      },
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentUser.email === null) {
      // redirectUser()
    }
    if (!tweetMessage) alert("Add tweet");

    if (!tweetMessage) return;
    if (currentUser.email === null) return;
    return sendUserTweet(tweetMessage);
  };

  return (
    <div className="comment-box">
      <form>
        <div className="comment-box_input">
          <input
            onChange={(event) => setTweetMessage(event.target.value)}
            placeholder="What do you have in mind..."
            value={tweetMessage}
            type="text"
          />
        </div>
        <div className="bottom-comment-box">
          {tweetMessage.length >= 140 ? (
            <div className="length-error">
              The tweet can't contain more then 140 chars.
            </div>
          ) : (
            ""
          )}
          {/* <button onClick={addTweet}>Do something</button> */}
          <Button
            // disabled={tweetMessage.length >= 140 ?
            //   true : false}
            className="comment-box_input-Button"
            variant="contained"
            type="submit"
            onClick={sendMessage}
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
}

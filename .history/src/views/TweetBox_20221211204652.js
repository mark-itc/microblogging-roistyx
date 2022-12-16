import { React, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { TweetPosterContext } from '../components/TweetPosterContext'
import { TweetsRenderContext } from "../components/TweetsRenderContext";
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
import { useAuth } from "../contexts/AuthContext";

// const firestoreIntance = getFirestore(app)
// const postCollection = collection(firestoreIntance, 'posts')
// console.log(postCollection)

export default function TweetBox({ username, renderMe }) {
  const { currentUser, postCollection } = useAuth();
  const [tweetMessage, setTweetMessage] = useState([]);

  const [posts, setPosts] = useState(true);
  const [render, setRender] = useState(true);
  console.log(renderMe);
  //   const {tweetsRender, setTweetsRender} = useContext(TweetsRenderContext)
  //   const navigate = useNavigate()
  const date =
    format(new Date(), "yyyy-MM-dd") +
    "T" +
    format(new Date(), "HH:mm:ss.ms") +
    "Z";
  //   const tweetMessageLength = tweetMessage.length
  //   const profileName = localStorage.getItem("PROFILE_NAME")
  // console.log(noProfileRedirect)

  // function redirectUser() {
  //   navigate("/profile")
  // }
  // console.log(profileName)
  //  console.log(noProfileRedirect)
  async function sendUserTweet() {
    const tweetObj = {
      avatar: "https://placekitten.com/200/287",
      date: date,
      displayName: username,
      text: tweetMessage,
      username: username,
    };
    try {
      await addDoc(postCollection, tweetObj);
    } catch (e) {
      console.log("Did not add tweet", e);
    }
  }

  const sendMessage = (e) => {
    e.preventDefault();
    // if (username === null) {
    //   redirectUser()
    // }
    // if (!tweetMessage ) alert("Add tweet")

    // if (!tweetMessage ) return
    // if (username === null) return
    // sendTweet()
    return sendUserTweet();
  };
  //   console.log(tweetMessage)
  // console.log("username, date", username, date)
  return (
    <div className="comment-box">
      {/* {tweetMessage ? <h1>Redirect</h1> : ""}  */}
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

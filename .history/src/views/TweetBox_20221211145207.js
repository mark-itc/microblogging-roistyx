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
} from "firebase/firestore/lite";

const firestoreIntance = getFirestore(app);
const postCollection = collection(firestoreIntance, "posts");
// console.log(postCollection)

export default function TweetBox(username) {
  const [tweetMessage, setTweetMessage] = useState();

  const [posts, setPosts] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTweetList() {
      const { docs } = await getDocs(postCollection);
      setLoading(false);
      const tweetMessage = docs.map((doc) => doc.data());
      setTweetMessage(tweetMessage);
    }
    getTweetList();
  }, []);

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
  //    function sendTweet() {
  //     fetch('https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet',{
  //       method: 'POST',
  //       headers: {
  //         'content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userName : profileName,
  //         content : tweetMessage,
  //         date : date,
  //     })}).then(response => {
  //       return response.json()
  //     })
  //   }
  // console.log(  tweetMessage
  //   )

  const sendMessage = (e) => {
    if (username === null) {
      //   redirectUser()
    }
    if (!tweetMessage) alert("Add tweet");
    e.preventDefault();
    if (!tweetMessage) return;
    if (username === null) return;

    setTweetsRender({
      content: tweetMessage,
      userName: username,
      date: date,
    });

    sendTweet();
    return;
  };

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
          {tweetMessageLength >= 140 ? (
            <div className="length-error">
              The tweet can't contain more then 140 chars.
            </div>
          ) : (
            ""
          )}
          <Button
            disabled={tweetMessageLength >= 140 ? true : false}
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

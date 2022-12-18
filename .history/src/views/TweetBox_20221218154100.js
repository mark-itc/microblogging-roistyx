import { React, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import "./TweetBox.css";
import { useAuth } from "../contexts/AuthContext";
import { TweetContext, ACTIONS } from "../contexts/TweetContext";

export default function TweetBox() {
  const { currentUser } = useAuth();
  const {
    tweetMessage,
    setTweetMessage,
    getProfilePic,
    userUrl,
    date,
    dispatch,
  } = useContext(TweetContext);

  useEffect(() => {
    getProfilePic();
  });

  async function sendUserTweet(tweetMessage) {
    dispatch({
      type: ACTIONS.ADD_TWEET,
      payload: {
        date: date,
        text: tweetMessage,
        username: currentUser.email,
        uid: currentUser.uid,
        avatar: userUrl,
      },
    });
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentUser.email === null) {
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
          <Button
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

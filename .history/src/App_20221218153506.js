import { Route, Routes } from "react-router-dom";
import { Profile } from "./views/Profile";
import Navbar from "./components/Navbar";
import Feed from "./views/Feed";
import Signup from "./views/Signup";
import Login from "./views/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { TweetContextProvider } from "./contexts/TweetContext";
import "./components/right-column.css";
import "./components/left-column.css";
import "./components/Navbar.css";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="app">
          {
            <TweetContextProvider>
              <Navbar className="navbar" />
              <div className="feed-comment_box-container">
                <Routes>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/" element={<Feed />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                </Routes>
              </div>
            </TweetContextProvider>
          }
        </div>
      </AuthProvider>
    </>
  );
}

export default App;

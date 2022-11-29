import './App.css';
import './components/Navbar.css';
import './components/left-column.css';
import './components/right-column.css';
import Feed from './views/Feed';
import Profile from './views/Profile';
import Navbar from './components/Navbar';
import {React} from 'react'
import {Route, Routes} from 'react-router-dom'

function App() {
  return (
    <>
    
      <div className="app">
        <Navbar className='navbar'/>
        <div className="left-column"></div>
        <div className="feed-comment_box-container"><Routes>
          <Route path="/" element={<Feed/>}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
        <div className="right-column"></div>
      </div>
    
    </>
  );
}

export default App;

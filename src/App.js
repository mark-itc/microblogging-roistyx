import './App.css';
import './components/Navbar.css';
import './components/left-column.css';
import './components/right-column.css';
import Feed from './views/Feed';
import Navbar from './components/Navbar';
import {React} from 'react'

function App() {
  return (
    <>
    
    <div className="app">
      <Navbar className='navbar'/>
      {/* <Profile /> */}
      <div className="left-column"></div>
      <div className="feed-comment_box-container">
        <Feed/>
      </div>
      <div className="right-column"></div>
    </div>
    </>
  );
}

export default App;

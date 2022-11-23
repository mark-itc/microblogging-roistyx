import './App.css';
import './components/left-column.css';
import './components/right-column.css';
import Feed from './components/Feed';


function App() {
  return (
    <div className="app">
      <div className="left-column"></div>
      <Feed/>
      <div className="right-column"></div>
    </div>
  );
}

export default App;

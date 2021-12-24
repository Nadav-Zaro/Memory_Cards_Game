import { useState } from 'react';
import './App.css';
import MemoryGame from './components/MemoryGame';

function App() {
  const [openGame, setOpenGame] = useState(false)
  return (
    <div className="App">
      <img className={!openGame?"openGameImg":"hiddenStart"} src="https://i.ibb.co/c2q10YY/openimg-optimized.jpg"/>
      <h1 className={!openGame?"h1":"hiddenStart"}>Yu Gi Oh</h1>
      <h3 className={!openGame?"h3":"hiddenStart"}>Memory Cards Game</h3>
      <button className={!openGame?"openGameBtn":"hiddenStart"} onClick={()=>setOpenGame(true)}>Let's Play!</button>
      {openGame?<MemoryGame />:""}
    </div>
  );
}

export default App;

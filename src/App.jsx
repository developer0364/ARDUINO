import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Instrucciones from "./components/instrucciones";
import JugarDisplay from './components/JugarDisplay';
import { GameProviderz } from './components/datos';

function App() {
  return (
    <GameProviderz>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/JugarDisplay" element={<JugarDisplay />} />
        <Route path="/instrucciones" element={<Instrucciones />} />
      </Routes>
    </GameProviderz>
  );
}

export default App;

import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import JugarDisplay from './components/JugarDisplay';
import './App.css';
import Home from './components/Home';
import Instrucciones from "./components/instrucciones";
import ColorBends from './components/ColorBends';
import { GameProviderz } from './components/datos';
import { useEffect } from 'react';
import { fetchCategories } from './services/api';

function App() {
 


  return (
 <GameProviderz>
 <Routes>
      
      <Route path="/" element={<Home/>} />
  <Route path="/JugarDisplay" element={<JugarDisplay />} />
  <Route path="/instrucciones" element={<Instrucciones />} />
  </Routes>
  </GameProviderz>
  );
}
export default App;
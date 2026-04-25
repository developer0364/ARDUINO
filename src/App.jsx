import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import JugarDisplay from './components/JugarDisplay';
import './App.css';
import Home from './components/Home';
import Instrucciones from "./components/instrucciones";
import ColorBends from './components/ColorBends';

function App() {
 

  return (
 <Routes>{/* Ruta para la página de inicio */}
      
      <Route path="/" element={<Home/>} />
  <Route path="/JugarDisplay" element={<JugarDisplay />} />
  <Route path="/instrucciones" element={<Instrucciones />} />
  </Routes>
  );
}
export default App;
import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import '../App.css';

export default function JugarDisplay() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>

      {/* Fondo animado */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#527cdc", "#5f115c"]} />
      </div>

      {/* Contenido */}
      <div className="main-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="title">En Proceso de construcción</h2>
      </div>

    </div>
  );
}
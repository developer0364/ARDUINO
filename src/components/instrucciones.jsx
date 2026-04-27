import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import '../App.css';

export default function Instrucciones() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>

      {/* Fondo animado */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#00ff22", "#0066FF"]} />
      </div>

      {/* Contenido */}
      <div className="main-wrapper top" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="title cuarenta">REGLAS E INSTRUCCIONES</h1>
        <div className="blackbox">
          <p className="cuarenta" >INSTRUCCIONES</p>
          <p className="texto-instrucciones">
    Selecciona tu temática y dificultad para responder un total de 5 preguntas. 
    Cada acierto suma 10 puntos. Si fallas, verás la corrección en tiempo real. 
    ¡Al terminar, descubre tu puntaje final y vuelve a intentarlo!
  </p>
        </div>
      </div>

    </div>
  );
}
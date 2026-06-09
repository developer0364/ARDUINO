import { useNavigate } from 'react-router-dom';
import Pantalla from './Pantalla';
import '../App.css';
import './instrucciones.css';

export default function Instrucciones() {
  const navigate = useNavigate();

  return (
    <Pantalla colors={["#ff0000", "#0066FF"]} contentClassName="top">
      <button
        className="instrucciones-btn-volver"
        onClick={() => navigate('/')}
      >
        ← BACK
      </button>
      <h1 className="title cuarenta">REGLAS E INSTRUCCIONES</h1>
      <div className="blackbox">
        <p className="cuarenta">INSTRUCCIONES</p>
        <p className="texto-instrucciones">
          Selecciona tu temática y dificultad para responder un total de 5 preguntas.
          Cada acierto suma 10 puntos. Si fallas, verás la corrección en tiempo real.
          ¡Al terminar, descubre tu puntaje final y vuelve a intentarlo!
        </p>
      </div>
    </Pantalla>
  );
}

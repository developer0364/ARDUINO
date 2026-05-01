import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import '../App.css';

export default function Instrucciones() {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>

   
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#ff0000", "#0066FF"]} />
      </div>

    
      <div className="main-wrapper top" style={{ position: 'relative', zIndex: 1 }}>
        <button
  onClick={() => navigate('/')}
  style={{
    position: 'absolute',
    top: '20px',
    left: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '10px',
    color: 'white',
    fontFamily: 'var(--fuente-titulo)',
    fontSize: '16px',
    padding: '10px 18px',
    cursor: 'pointer',
    width: 'auto',
    height: 'auto',
    zIndex: 100,
  }}
>
  ← BACK
</button>
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
import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';

function Home() {
  const navigate = useNavigate();

  const manejarClickJugar = () => {
    navigate('/JugarDisplay'); 
  };

  const manejarClickInstrucciones = () => {
    navigate('/instrucciones'); 
  };

  return (
  /* Contenedor principal que ocupa toda la pantalla */
  <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: "black" }}>
    
    {/* 1. Capa del fondo (el componente de React Bits) */}
    <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      <ColorBends 
        speed={0.4} 
        colors={["#00CFFF", "#0066FF"]} 
      />
    </div>
    
    {/* 2. Tu contenido original (encima del fondo gracias al zIndex) */}
    <div className="main-wrapper" style={{ position: 'relative', zIndex: 1 }}>
      <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
      <p className="texto">SELECCIONA UNA OPCIÓN</p>
      <div className="contenedor-botones">
        <button onClick={manejarClickInstrucciones}>INSTRUCCIONES</button>
        <button onClick={manejarClickJugar}>JUGAR</button>
        <button>BLANK</button>
      </div>
    </div>

  </div>
);
    
    

}

export default Home;
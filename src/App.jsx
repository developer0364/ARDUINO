import { useState } from 'react'
import './App.css'


function App() {
  // 1. La lógica la definimos como una función real
  const navigate= useNavigate();
  const manejarClickJugar = () => {
    navigate('/jugarDisplay');
    
    
  };

  return (
    <div className="main-wrapper">
      <div>
        <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
        <p className="texto">SELECCIONA</p>

        <div className="contenedor-botones">
          {/* 2. Llamamos a la función directamente aquí */}
          <button onClick={manejarClickJugar}>JUGAR</button>
          <button>INSTRUCCIONES</button>
          <button>BLANK</button>
        </div>
      </div>
    </div>
  );
}

export default App;
import { useNavigate } from 'react-router-dom'; // <--- ¿Tenías esta línea?
import './App.css';

function App() {
  const navigate = useNavigate();

  const manejarClickJugar = () => {
    navigate('/jugarDisplay');
  };

  return (
    <div>
      <div className="main-wrapper">
        <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
        <p className="texto">SELECCIONA</p>

        <div className="contenedor-botones">
          <button onClick={manejarClickJugar}>JUGAR</button>
          <button>INSTRUCCIONES</button>
          <button>BLANK</button>
        </div>
      </div>
    </div>
  );
}

export default App;
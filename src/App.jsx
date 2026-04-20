import { useNavigate } from 'react-router-dom';
import JugarDisplay from './jugarDisplay';
import './App.css';

function App() {
  const navigate = useNavigate(); 

  const manejarClickJugar = () => {
    navigate('/jugarDisplay'); 
  };

  return (
    /* El "main-wrapper" es el escenario completo */
    <div className="main-wrapper">
      
      {/* El encabezado principal */} 
      <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
      
   
      <p className="texto">SELECCIONA UNA OPCIÓN</p>

      {/* Esta es la "bandeja" donde apoyamos los botones */}
      <div className="contenedor-botones">
        
        <button>INSTRUCCIONES</button>
        <button  onClick={manejarClickJugar}>
          JUGAR</button>
        <button >BLANK</button>
      </div>

    </div>
  );
}
// pendiente de alinear botones con texto superior
export default App;
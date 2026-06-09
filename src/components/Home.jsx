import { useNavigate } from 'react-router-dom';
import Pantalla from './Pantalla';
import DropdownMenu from './menudesplegable';
import { useDatosTrivia } from './datos';
import { OPCIONES_DIFICULTAD } from '../constants/config';
import './Home.css';

function Home() {
  const navegar = useNavigate();
  const { Tematica, setTematica, Dificultad, setDificultad, categorias, cargandoCategorias } = useDatosTrivia();

  const manejarInicioJuego = () => {
    if (!Tematica || !Dificultad) {
      alert('Seleccioná una TEMÁTICA y una DIFICULTAD antes de jugar.');
      return;
    }
    navegar('/JugarDisplay');
  };

  const seleccionCompleta = Tematica && Dificultad;
  const labelTematica = categorias.find(c => c.value === Tematica)?.label;

  return (
    <Pantalla colors={["#00CFFF", "#0066FF"]}>
      <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
      <p className="texto">SELECCIONA UNA OPCIÓN</p>
      <div className="contenedor-botones">
        <button onClick={() => navegar('/instrucciones')}>INSTRUCCIONES</button>
        <DropdownMenu
          etiqueta={cargandoCategorias ? "CARGANDO..." : "TEMÁTICA"}
          opciones={categorias}
          seleccionado={Tematica}
          alSeleccionar={setTematica}
        />
        <DropdownMenu
          etiqueta="DIFICULTAD"
          opciones={OPCIONES_DIFICULTAD}
          seleccionado={Dificultad}
          alSeleccionar={setDificultad}
        />
        <button
          onClick={manejarInicioJuego}
          className={seleccionCompleta ? '' : 'boton-desactivado'}
        >
          JUGAR
        </button>
      </div>
      {(Tematica || Dificultad) && (
        <p className="home-seleccion-actual">
          {labelTematica ? `TEMÁTICA: ${labelTematica}` : ''}
          {labelTematica && Dificultad ? '  ·  ' : ''}
          {Dificultad ? `DIFICULTAD: ${Dificultad.toUpperCase()}` : ''}
        </p>
      )}
    </Pantalla>
  );
}

export default Home;

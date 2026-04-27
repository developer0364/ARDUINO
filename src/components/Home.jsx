import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import DropdownMenu from './menudesplegable';
import { useDatosTrivia } from './datos';
const OPCIONES_TEMATICA = [
  { value: 'hardware', label: 'HARDWARE' },
  { value: 'software', label: 'SOFTWARE' },
];

const OPCIONES_DIFICULTAD = [
  { value: 'facil',   label: 'FÁCIL'   },
  { value: 'medio',   label: 'MEDIO'   },
  { value: 'dificil', label: 'DIFÍCIL' },
];

function Home() {
  const navegar = useNavigate();
  const { Tematica, setTematica, Dificultad, setDificultad } = useDatosTrivia();

  const manejarInicioJuego = () => {
    if (!Tematica || !Dificultad) {
      alert('Seleccioná una TEMÁTICA y una DIFICULTAD antes de jugar.');
      return;
    }
    navegar('/JugarDisplay');
  };

  const seleccionCompleta = Tematica && Dificultad;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#00CFFF", "#0066FF"]} />
      </div>

      <div className="main-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="title">BIENVENIDOS A LA TRIVIA</h1>
        <p className="texto">SELECCIONA UNA OPCIÓN</p>

        <div className="contenedor-botones">
          <button onClick={() => navegar('/instrucciones')}>INSTRUCCIONES</button>

          <DropdownMenu
            etiqueta="TEMÁTICA"
            opciones={OPCIONES_TEMATICA}
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
            style={{
              opacity: seleccionCompleta ? 1 : 0.45,
              cursor: seleccionCompleta ? 'pointer' : 'not-allowed',
            }}
          >
            JUGAR
          </button>
        </div>

        { (Tematica || Dificultad) && (
          <p style={{
            fontFamily: 'var(--fuente-titulo)',
            color: 'rgba(255,255,255,0.55)',
            fontSize: '16px',
            letterSpacing: '3px',
            marginTop: '22px',
          }}>
            {Tematica ? `TEMÁTICA: ${Tematica.toUpperCase()}` : ''}
            {Tematica && Dificultad ? '  ·  ' : ''}
            {Dificultad ? `DIFICULTAD: ${Dificultad.toUpperCase()}` : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
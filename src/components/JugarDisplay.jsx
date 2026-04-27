import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import { useDatosTrivia } from './datos';
import { obtenerPreguntas } from '../preguntas';
import '../App.css';
import './JugarDisplay.css';

export default function JugarDisplay() {
  const navegar = useNavigate();
  const { Tematica, Dificultad } = useDatosTrivia();

  const [listaPreguntas, setListaPreguntas] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [opcionElegida, setOpcionElegida] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  useEffect(() => {
    if (Tematica && Dificultad) {
      setListaPreguntas(obtenerPreguntas(Tematica, Dificultad, 5));
    }
  }, [Tematica, Dificultad]);

  if (!Tematica || !Dificultad) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ColorBends speed={0.4} colors={["#527cdc", "#5f115c"]} />
        </div>
        <div className="main-wrapper" style={{ position: 'relative', zIndex: 1 }}>
          <div className="blackbox" style={{ textAlign: 'center', gap: '20px' }}>
            <p className="cuarenta" style={{ color: 'white' }}>⚠️ SIN CONFIGURACIÓN</p>
            <p className="texto-instrucciones">No seleccionaste temática ni dificultad.</p>
            <button onClick={() => navegar('/')}>VOLVER AL INICIO</button>
          </div>
        </div>
      </div>
    );
  }

  if (listaPreguntas.length === 0) return null;

  const preguntaActual = listaPreguntas[indiceActual];
  const esCorrecta = opcionElegida === preguntaActual.respuesta;

  const manejarSeleccion = (opcion) => {
    if (respondido) return;
    setOpcionElegida(opcion);
    setRespondido(true);
    if (opcion === preguntaActual.respuesta) setPuntaje(p => p + 10);
  };

  const manejarSiguiente = () => {
    if (indiceActual + 1 >= listaPreguntas.length) {
      setJuegoTerminado(true);
    } else {
      setIndiceActual(i => i + 1);
      setOpcionElegida(null);
      setRespondido(false);
    }
  };

  const reiniciarJuego = () => {
    setListaPreguntas(obtenerPreguntas(Tematica, Dificultad, 5));
    setIndiceActual(0);
    setPuntaje(0);
    setOpcionElegida(null);
    setRespondido(false);
    setJuegoTerminado(false);
  };

  if (juegoTerminado) {
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ColorBends speed={0.3} colors={["#00CFFF", "#5227FF"]} />
        </div>
        <div className="main-wrapper" style={{ position: 'relative', zIndex: 1 }}>
          <div className="blackbox caja-resultado">
            <h2 className="title" style={{ fontSize: '52px' }}>RESULTADO FINAL</h2>
            <p className="meta-resultado">{Tematica.toUpperCase()} · {Dificultad.toUpperCase()}</p>
            <p className="puntaje-final-texto">{puntaje} / 50</p>
            <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
              <button onClick={reiniciarJuego}>REINTENTAR</button>
              <button onClick={() => navegar('/')}>INICIO</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#527cdc", "#5f115c"]} />
      </div>

      <img 
        src="/back.svg" 
        style={{ position: 'absolute', top: '20px', left: '20px', cursor: 'pointer', zIndex: 100, width: '40px' }} 
        onClick={() => navegar('/')} 
        alt="volver" 
      />

      <div className="main-wrapper top" style={{ position: 'relative', zIndex: 1 }}>
        <div className="encabezado-trivia">
          <span className="info-trivia">{Tematica.toUpperCase()} · {Dificultad.toUpperCase()}</span>
          <span className="progreso-trivia">PREGUNTA {indiceActual + 1} / {listaPreguntas.length}</span>
          <span className="puntaje-trivia">PUNTAJE: {puntaje}</span>
        </div>

        <div className="barra-progreso-fondo">
          <div
            className="barra-progreso-relleno"
            style={{ width: `${(indiceActual / listaPreguntas.length) * 100}%` }}
          />
        </div>

        <div className="blackbox caja-trivia">
          <p className="pregunta-texto">{preguntaActual.pregunta}</p>

          <div className="contenedor-opciones">
            {preguntaActual.opciones.map((opcion) => {
              let claseOpcion = 'boton-opcion';
              if (respondido) {
                if (opcion === preguntaActual.respuesta) claseOpcion += ' opcion-correcta';
                else if (opcion === opcionElegida) claseOpcion += ' opcion-incorrecta';
                else claseOpcion += ' opcion-desactivada';
              }
              return (
                <button
                  key={opcion}
                  className={claseOpcion}
                  onClick={() => manejarSeleccion(opcion)}
                >
                  {opcion}
                </button>
              );
            })}
          </div>

          {respondido && (
            <div className={`mensaje-retroalimentacion ${esCorrecta ? 'retro-correcta' : 'retro-incorrecta'}`}>
              {esCorrecta ? '✅ ¡CORRECTO! +10 PUNTOS' : `❌ INCORRECTO. ERA: ${preguntaActual.respuesta}`}
            </div>
          )}

          {respondido && (
            <button className="boton-siguiente" onClick={manejarSiguiente}>
              {indiceActual + 1 >= listaPreguntas.length ? 'VER RESULTADOS →' : 'SIGUIENTE →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ColorBends from './ColorBends';
import { useDatosTrivia } from './datos';
import { fetchQuestions } from '../services/api';
import { DIFFICULTY_MAP } from '../constants/config';
import '../App.css';
import './JugarDisplay.css';

function decodificarHTML(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}

function transformarPregunta(raw) {
  const opciones = [...raw.incorrect_answers, raw.correct_answer]
    .map(decodificarHTML)
    .sort(() => Math.random() - 0.5);
  return {
    pregunta: decodificarHTML(raw.question),
    respuesta: decodificarHTML(raw.correct_answer),
    opciones,
  };
}

function Pantalla({ colors = ["#527cdc", "#5f115c"], children }) {
  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={colors} />
      </div>
      <div className="main-wrapper" style={{ position: 'relative', zIndex: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  );
}

export default function JugarDisplay() {
  const navegar = useNavigate();
  const { Tematica, Dificultad, categorias } = useDatosTrivia();

  const [listaPreguntas, setListaPreguntas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [opcionElegida, setOpcionElegida] = useState(null);
  const [respondido, setRespondido] = useState(false);
  const [juegoTerminado, setJuegoTerminado] = useState(false);

  // Guarda la clave de la última carga para evitar doble fetch (React StrictMode / 429)
  const ultimaCargaRef = useRef('');

  const cargarPreguntas = useCallback(async () => {
    setCargando(true);
    setError(null);
    setListaPreguntas([]);

    const diffEn = DIFFICULTY_MAP[Dificultad];
    const data = await fetchQuestions(Tematica, diffEn);

    if (!data || data.response_code !== 0 || !data.results?.length) {
      const mensajes = {
        1: "No hay preguntas disponibles para esta categoría y dificultad. Probá otra combinación.",
        2: "Parámetros inválidos. Volvé al inicio y elegí de nuevo.",
      };
      setError(mensajes[data?.response_code] ?? "No se pudo conectar con el servidor. Revisá tu conexión.");
      setCargando(false);
      return;
    }

    setListaPreguntas(data.results.map(transformarPregunta));
    setCargando(false);
  }, [Tematica, Dificultad]);

  useEffect(() => {
    if (!Tematica || !Dificultad) return;

    // Clave única por combinación — evita el doble montaje de StrictMode
    const clave = `${Tematica}-${Dificultad}`;
    if (ultimaCargaRef.current === clave) return;
    ultimaCargaRef.current = clave;

    cargarPreguntas();
  }, [Tematica, Dificultad, cargarPreguntas]);

  const labelCategoria = categorias.find(c => c.value === Tematica)?.label || '';

  if (!Tematica || !Dificultad) {
    return (
      <Pantalla>
        <div className="blackbox" style={{ textAlign: 'center', gap: '20px' }}>
          <p className="cuarenta" style={{ color: 'white' }}>⚠️ SIN CONFIGURACIÓN</p>
          <p className="texto-instrucciones">No seleccionaste temática ni dificultad.</p>
          <button onClick={() => navegar('/')}>VOLVER AL INICIO</button>
        </div>
      </Pantalla>
    );
  }

  if (cargando) {
    return (
      <Pantalla>
        <p style={{ color: 'white', fontFamily: 'var(--fuente-titulo)', fontSize: '24px', letterSpacing: '3px', textAlign: 'center' }}>
          CARGANDO PREGUNTAS...
        </p>
      </Pantalla>
    );
  }

  if (error) {
    return (
      <Pantalla colors={["#ff4444", "#5f115c"]}>
        <div className="blackbox" style={{ textAlign: 'center', gap: '20px' }}>
          <p className="cuarenta" style={{ color: 'white' }}>⚠️ SIN PREGUNTAS</p>
          <p className="texto-instrucciones">{error}</p>
          <button onClick={() => navegar('/')}>VOLVER AL INICIO</button>
        </div>
      </Pantalla>
    );
  }

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

  const reiniciarJuego = async () => {
    setIndiceActual(0);
    setPuntaje(0);
    setOpcionElegida(null);
    setRespondido(false);
    setJuegoTerminado(false);
    ultimaCargaRef.current = ''; // Limpia la protección para permitir recargar
    await cargarPreguntas();
  };

  if (juegoTerminado) {
    return (
      <Pantalla colors={["#00CFFF", "#5227FF"]}>
        <div className="blackbox caja-resultado">
          <h2 className="title" style={{ fontSize: 'clamp(32px, 6vw, 52px)' }}>RESULTADO FINAL</h2>
          <p className="meta-resultado">{labelCategoria} · {Dificultad.toUpperCase()}</p>
          <p className="puntaje-final-texto">{puntaje} / 50</p>
          <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={reiniciarJuego}>REINTENTAR</button>
            <button onClick={() => navegar('/')}>INICIO</button>
          </div>
        </div>
      </Pantalla>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden', backgroundColor: 'black' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <ColorBends speed={0.4} colors={["#527cdc", "#5f115c"]} />
      </div>

      <button
        onClick={() => navegar('/')}
        style={{
          position: 'absolute', top: '16px', left: '16px', zIndex: 100,
          width: 'auto', height: 'auto', padding: '8px 16px', fontSize: '14px',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)',
          backdropFilter: 'blur(10px)', borderRadius: '8px',
          color: 'white', cursor: 'pointer', fontFamily: 'var(--fuente-titulo)',
        }}
      >
        ← VOLVER
      </button>

      <div className="main-wrapper top" style={{ position: 'relative', zIndex: 1, padding: '16px' }}>
        <div className="encabezado-trivia">
          <span className="info-trivia">{labelCategoria}</span>
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
                <button key={opcion} className={claseOpcion} onClick={() => manejarSeleccion(opcion)}>
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
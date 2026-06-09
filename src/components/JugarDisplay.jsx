import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Pantalla from './Pantalla';
import { useDatosTrivia } from './datos';
import { fetchQuestions } from '../services/api';
import { DIFFICULTY_MAP } from '../constants/config';
import '../App.css';
import './jugarDisplay.css';

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

  const ultimaCargaRef = useRef('');
  const hidDeviceRef = useRef(null);
  const [arduinoConectado, setArduinoConectado] = useState(false);

  const conectarArduino = async () => {
    try {
      const devices = await navigator.hid.requestDevice({
        filters: [{ vendorId: 0x16C0, productId: 0x05DF }]
      });
      if (!devices.length) return;
      const device = devices[0];
      await device.open();
      hidDeviceRef.current = device;
      setArduinoConectado(true);
    } catch (err) {
      console.error('Arduino no conectado:', err);
    }
  };

  const enviarLED = async (esCorrecta) => {
    if (!hidDeviceRef.current) return;
    const data = new Uint8Array(8);
    data[0] = esCorrecta ? 0x47 : 0x52; // 'G' o 'R'
    await hidDeviceRef.current.sendReport(0, data);
  };

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
    const clave = `${Tematica}-${Dificultad}`;
    if (ultimaCargaRef.current === clave) return;
    ultimaCargaRef.current = clave;
    cargarPreguntas();
  }, [Tematica, Dificultad, cargarPreguntas]);

  const labelCategoria = categorias.find(c => c.value === Tematica)?.label || '';

  if (!Tematica || !Dificultad) {
    return (
      <Pantalla colors={["#527cdc", "#5f115c"]}>
        <div className="blackbox sin-config-box">
          <p className="cuarenta">⚠️ SIN CONFIGURACIÓN</p>
          <p className="texto-instrucciones">No seleccionaste temática ni dificultad.</p>
          <button onClick={() => navegar('/')}>VOLVER AL INICIO</button>
        </div>
      </Pantalla>
    );
  }

  if (cargando) {
    return (
      <Pantalla colors={["#527cdc", "#5f115c"]}>
        <p className="cargando-texto">CARGANDO PREGUNTAS...</p>
      </Pantalla>
    );
  }

  if (error) {
    return (
      <Pantalla colors={["#ff4444", "#5f115c"]}>
        <div className="blackbox error-box">
          <p className="cuarenta">⚠️ SIN PREGUNTAS</p>
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
    const correcta = opcion === preguntaActual.respuesta;
    if (correcta) setPuntaje(p => p + 10);
    enviarLED(correcta);
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
    ultimaCargaRef.current = '';
    await cargarPreguntas();
  };

  if (juegoTerminado) {
    return (
      <Pantalla colors={["#00CFFF", "#5227FF"]}>
        <div className="blackbox caja-resultado">
          <h2 className="title titulo-resultado">RESULTADO FINAL</h2>
          <p className="meta-resultado">{labelCategoria} · {Dificultad.toUpperCase()}</p>
          <p className="puntaje-final-texto">{puntaje} / 50</p>
          <div className="resultado-botones">
            <button onClick={reiniciarJuego}>REINTENTAR</button>
            <button onClick={() => navegar('/')}>INICIO</button>
          </div>
        </div>
      </Pantalla>
    );
  }

  return (
    <Pantalla colors={["#527cdc", "#5f115c"]} contentClassName="top jugar-content">
      <button className="jugar-btn-volver" onClick={() => navegar('/')}>← VOLVER</button>
      <button className="jugar-btn-arduino" onClick={conectarArduino}>
        {arduinoConectado ? '🟢 ARDUINO' : '⚪ ARDUINO'}
      </button>
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
    </Pantalla>
  );
}

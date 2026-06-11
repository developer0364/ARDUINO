import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Pantalla from "./Pantalla";
import { useDatosTrivia } from "./datos";
import { fetchQuestions } from "../services/api";
import { DIFFICULTY_MAP } from "../constants/config";
import { BotonVolver, BotonArduino, BotonSiguiente, BotonesResultado } from "./Botones";
import { transformarPregunta } from "../utils/triviaUtils";
import "../App.css";
import "./jugarDisplay.css";

function PantallaMensaje({ colors, titulo, mensaje, onVolver }) {
  return (
    <Pantalla colors={colors}>
      <div className="blackbox pantalla-mensaje-box">
        <p className="cuarenta">{titulo}</p>
        <p className="texto-instrucciones">{mensaje}</p>
        <button onClick={onVolver}>VOLVER AL INICIO</button>
      </div>
    </Pantalla>
  );
}

function BarraProgreso({ actual, total }) {
  const rellenoRef = useRef(null);
  useEffect(() => {
    if (rellenoRef.current) {
      rellenoRef.current.style.width = `${(actual / total) * 100}%`;
    }
  }, [actual, total]);
  return (
    <div className="barra-progreso-fondo">
      <div className="barra-progreso-relleno" ref={rellenoRef} />
    </div>
  );
}

function OpcionesRespuesta({ opciones, respondido, respuesta, opcionElegida, onSeleccionar }) {
  return (
    <div className="contenedor-opciones">
      {opciones.map((opcion) => {
        let clase = "boton-opcion";
        if (respondido) {
          if (opcion === respuesta) clase += " opcion-correcta";
          else if (opcion === opcionElegida) clase += " opcion-incorrecta";
          else clase += " opcion-desactivada";
        }
        return (
          <button
            key={opcion}
            className={clase}
            disabled={respondido}
            onClick={() => onSeleccionar(opcion)}
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );
}

function MensajeRetroalimentacion({ esCorrecta, respuestaCorrecta }) {
  return (
    <div className={`mensaje-retroalimentacion ${esCorrecta ? "retro-correcta" : "retro-incorrecta"}`}>
      {esCorrecta ? "✅ ¡CORRECTO! +10 PUNTOS" : `❌ INCORRECTO. ERA: ${respuestaCorrecta}`}
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
  const [dispositivoUSB, setDispositivoUSB] = useState(null);

  const ultimaCargaRef = useRef("");

  const enviarSenalHardware = async (letra) => {
    if (!dispositivoUSB) return;
    try {
      await dispositivoUSB.controlTransferOut({
        requestType: "class",
        recipient: "device",
        request: 0x09,
        value: 0x0000,
        index: letra.charCodeAt(0),
      });
    } catch (err) {
      console.error("Error al transferir datos por WebUSB:", err);
    }
  };

  const conectarUSB = async () => {
    try {
      const device = await navigator.usb.requestDevice({ filters: [] });
      await device.open();
      if (device.configuration === null) await device.selectConfiguration(1);
      try {
        await device.claimInterface(0);
      } catch (_) {}
      setDispositivoUSB(device);
    } catch (err) {
      console.error("Error de conexión WebUSB:", err);
    }
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
      setError(
        mensajes[data?.response_code] ??
          "No se pudo conectar con el servidor. Revisá tu conexión."
      );
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

  const labelCategoria = categorias.find((c) => c.value === Tematica)?.label || "";

  if (!Tematica || !Dificultad) {
    return (
      <PantallaMensaje
        colors={["#527cdc", "#5f115c"]}
        titulo="⚠️ SIN CONFIGURACIÓN"
        mensaje="No seleccionaste temática ni dificultad."
        onVolver={() => navegar("/")}
      />
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
      <PantallaMensaje
        colors={["#ff4444", "#5f115c"]}
        titulo="⚠️ SIN PREGUNTAS"
        mensaje={error}
        onVolver={() => navegar("/")}
      />
    );
  }

  const preguntaActual = listaPreguntas[indiceActual];
  const esCorrecta = opcionElegida === preguntaActual.respuesta;

  const manejarSiguiente = () => {
    if (indiceActual + 1 >= listaPreguntas.length) {
      setJuegoTerminado(true);
    } else {
      setIndiceActual((i) => i + 1);
      setOpcionElegida(null);
      setRespondido(false);
    }
  };

  const manejarSeleccion = (opcion) => {
    if (respondido) return;
    setOpcionElegida(opcion);
    setRespondido(true);
    if (opcion === preguntaActual.respuesta) {
      setPuntaje((p) => p + 10);
      enviarSenalHardware("V");
    } else {
      enviarSenalHardware("R");
    }
  };

  const reiniciarJuego = async () => {
    setIndiceActual(0);
    setPuntaje(0);
    setOpcionElegida(null);
    setRespondido(false);
    setJuegoTerminado(false);
    ultimaCargaRef.current = "";
    await cargarPreguntas();
  };

  if (juegoTerminado) {
    return (
      <Pantalla colors={["#00CFFF", "#5227FF"]}>
        <div className="blackbox caja-resultado">
          <h2 className="title titulo-resultado">RESULTADO FINAL</h2>
          <p className="meta-resultado">
            {labelCategoria} · {Dificultad.toUpperCase()}
          </p>
          <p className="puntaje-final-texto">{puntaje} / 50</p>
          <BotonesResultado
            onReintentar={reiniciarJuego}
            onInicio={() => navegar("/")}
          />
        </div>
      </Pantalla>
    );
  }

  return (
    <Pantalla colors={["#527cdc", "#5f115c"]} contentClassName="top jugar-content">
      <BotonVolver onClick={() => navegar("/")} />
      <BotonArduino conectado={dispositivoUSB} onClick={conectarUSB} />
      <div className="encabezado-trivia">
        <span className="info-trivia">{labelCategoria}</span>
        <span className="progreso-trivia">
          PREGUNTA {indiceActual + 1} / {listaPreguntas.length}
        </span>
        <span className="puntaje-trivia">PUNTAJE: {puntaje}</span>
      </div>
      <BarraProgreso actual={indiceActual} total={listaPreguntas.length} />
      <div className="blackbox caja-trivia">
        <p className="pregunta-texto">{preguntaActual.pregunta}</p>
        <OpcionesRespuesta
          opciones={preguntaActual.opciones}
          respondido={respondido}
          respuesta={preguntaActual.respuesta}
          opcionElegida={opcionElegida}
          onSeleccionar={manejarSeleccion}
        />
        {respondido && (
          <MensajeRetroalimentacion
            esCorrecta={esCorrecta}
            respuestaCorrecta={preguntaActual.respuesta}
          />
        )}
        {respondido && (
          <BotonSiguiente
            esUltima={indiceActual + 1 >= listaPreguntas.length}
            onClick={manejarSiguiente}
          />
        )}
      </div>
    </Pantalla>
  );
}

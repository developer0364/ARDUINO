export function BotonVolver({ onClick }) {
  return (
    <button className="jugar-btn-volver" onClick={onClick}>
      ← VOLVER
    </button>
  );
}

export function BotonArduino({ conectado, onClick }) {
  return (
    <button className="jugar-btn-arduino" onClick={onClick}>
      {conectado ? "🟢 ARDUINO" : "⚪ ARDUINO"}
    </button>
  );
}

export function BotonSiguiente({ esUltima, onClick }) {
  return (
    <button className="boton-siguiente" onClick={onClick}>
      {esUltima ? "VER RESULTADOS →" : "SIGUIENTE →"}
    </button>
  );
}

export function BotonesResultado({ onReintentar, onInicio }) {
  return (
    <div className="resultado-botones">
      <button onClick={onReintentar}>REINTENTAR</button>
      <button onClick={onInicio}>INICIO</button>
    </div>
  );
}

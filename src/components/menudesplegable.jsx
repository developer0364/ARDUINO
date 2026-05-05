import { useState } from 'react';
import './menudespegable.css';

export default function DropdownMenu({ etiqueta, opciones, seleccionado, alSeleccionar }) {
  const [abierto, setAbierto] = useState(false);
  const [fijado, setFijado] = useState(false);

  const panelVisible = abierto || fijado;

  const opcionActual = opciones.find(o => o.value === seleccionado);

  const handleClick = () => {
    setFijado(f => !f);
  };

  return (
    <div
      className="contenedor-desplegable"
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => setAbierto(false)}
    >
      <button
        className={`boton-desplegable ${seleccionado ? 'boton-desplegable--activo' : ''}`}
        onClick={handleClick}
      >
        <div className="etiqueta-desplegable">
          {opcionActual ? (
            <>
              <span className="sub-etiqueta">{etiqueta}</span>
              <span className="valor-seleccionado">{opcionActual.label}</span>
            </>
          ) : etiqueta}
        </div>
        <span className={`flecha-indicadora ${panelVisible ? 'flecha--arriba' : ''}`}>▼</span>
      </button>

      <div className={`panel-desplegable ${panelVisible ? 'panel--abierto' : ''}`}>
        {opciones.map(opcion => (
          <button
            key={opcion.value}
            className={`opcion-item ${seleccionado === opcion.value ? 'opcion--marcada' : ''}`}
            onClick={() => {
              alSeleccionar(opcion.value);
              setFijado(false);
              setAbierto(false);
            }}
          >
            {opcion.label}
            {seleccionado === opcion.value && <span className="tilde-seleccion">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
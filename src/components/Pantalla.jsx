import ColorBends from './ColorBends';
import './pantalla.css';

export default function Pantalla({ colors, contentClassName = '', children }) {
  return (
    <div className="pantalla-wrapper">
      <div className="pantalla-fondo">
        <ColorBends speed={0.4} colors={colors} />
      </div>
      <div className={`main-wrapper pantalla-contenido ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}

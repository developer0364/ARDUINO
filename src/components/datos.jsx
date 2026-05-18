import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { fetchCategories } from '../services/api';

const TRADUCCIONES = {
  "General Knowledge":                          "CONOCIMIENTO GENERAL",
  "Entertainment: Books":                       "ENTRETENIMIENTO: LIBROS",
  "Entertainment: Film":                        "ENTRETENIMIENTO: PELÍCULAS",
  "Entertainment: Music":                       "ENTRETENIMIENTO: MÚSICA",
  "Entertainment: Musicals & Theatres":         "ENTRETENIMIENTO: MUSICALES Y TEATRO",
  "Entertainment: Television":                  "ENTRETENIMIENTO: TELEVISIÓN",
  "Entertainment: Video Games":                 "ENTRETENIMIENTO: VIDEOJUEGOS",
  "Entertainment: Board Games":                 "ENTRETENIMIENTO: JUEGOS DE MESA",
  "Science & Nature":                           "CIENCIA Y NATURALEZA",
  "Science: Computers":                         "CIENCIA: COMPUTADORAS",
  "Science: Mathematics":                       "CIENCIA: MATEMÁTICAS",
  "Mythology":                                  "MITOLOGÍA",
  "Sports":                                     "DEPORTES",
  "Geography":                                  "GEOGRAFÍA",
  "History":                                    "HISTORIA",
  "Politics":                                   "POLÍTICA",
  "Art":                                        "ARTE",
  "Celebrities":                                "CELEBRIDADES",
  "Animals":                                    "ANIMALES",
  "Vehicles":                                   "VEHÍCULOS",
  "Entertainment: Comics":                      "ENTRETENIMIENTO: CÓMICS",
  "Science: Gadgets":                           "CIENCIA: GADGETS",
  "Entertainment: Japanese Anime & Manga":      "ENTRETENIMIENTO: ANIME Y MANGA",
  "Entertainment: Cartoon & Animations":        "ENTRETENIMIENTO: CARICATURAS",
};

const JuegoDatos = createContext(null);

export function GameProviderz({ children }) {
  const [Tematica, setTematica] = useState(null);
  const [Dificultad, setDificultad] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(true);


  const yaCargoRef = useRef(false);

  useEffect(() => {
    if (yaCargoRef.current) return;
    yaCargoRef.current = true;

    const cargar = async () => {
      const data = await fetchCategories();
      if (!data || data.length === 0) {
        setCargandoCategorias(false);
        return;
      }
      const opciones = data.map(cat => ({
        value: cat.id,
        label: TRADUCCIONES[cat.name] || cat.name.toUpperCase(),
      }));
      setCategorias(opciones);
      setCargandoCategorias(false);
    };

    cargar();
  }, []);

  return (
    <JuegoDatos.Provider value={{
      Tematica, setTematica,
      Dificultad, setDificultad,
      categorias,
      cargandoCategorias,
    }}>
      {children}
    </JuegoDatos.Provider>
  );
}

export function useDatosTrivia() {
  const ctx = useContext(JuegoDatos);
  if (!ctx) throw new Error('useDatosTrivia debe usarse dentro de un GameProviderz');
  return ctx;
}
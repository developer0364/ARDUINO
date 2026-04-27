import { createContext, useContext, useState } from 'react';

const JuegoDatos = createContext(null);

export function GameProviderz({ children }) {
  const [Tematica, setTematica] = useState(null);       
  const [Dificultad, setDificultad] = useState(null); 

  return (
    <JuegoDatos.Provider value={{ Tematica, setTematica, Dificultad, setDificultad }}>
      {children}
    </JuegoDatos.Provider>
  );
}

export function useDatosTrivia() {

  const ctx = useContext(JuegoDatos);
  
  if (!ctx) {
    throw new Error('useDatosTrivia debe usarse dentro de un GameProviderz');
  }
  
  return ctx;
}
export function decodificarHTML(str) {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function transformarPregunta(raw) {
  const opciones = [...raw.incorrect_answers, raw.correct_answer]
    .map(decodificarHTML)
    .sort(() => Math.random() - 0.5);
  return {
    pregunta: decodificarHTML(raw.question),
    respuesta: decodificarHTML(raw.correct_answer),
    opciones,
  };
}

import {
  API_BASE_URL,
  API_CATEGORIES_URL,
  AMOUNT_QUESTIONS,
} from "../constants/config";

export const fetchCategories = async () => {
  try {
    const response = await fetch(API_CATEGORIES_URL);
    const data = await response.json();
    return data.trivia_categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Traduce todas las preguntas de una sola llamada a Claude
async function traducirPreguntas(results) {
  try {
    // Armamos un JSON minimalista para no desperdiciar tokens
    const payload = results.map((q, i) => ({
      i,
      q: q.question,
      c: q.correct_answer,
      w: q.incorrect_answers,
    }));

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: `Traducí al español argentino este JSON de preguntas de trivia.
Devolvé ÚNICAMENTE el JSON traducido, sin explicaciones ni backticks.
Mantené exactamente la misma estructura: array de objetos con campos i, q, c, w.
No traduzcas nombres propios, marcas, títulos de obras ni siglas.

${JSON.stringify(payload)}`,
          },
        ],
      }),
    });

    const data = await response.json();
    const texto = data.content?.find(b => b.type === "text")?.text?.trim();
    if (!texto) return results; // si falla, devuelve original

    const traducido = JSON.parse(texto);

    // Reconstruimos el array original con los campos traducidos
    return results.map((q, i) => {
      const t = traducido.find(x => x.i === i);
      if (!t) return q;
      return {
        ...q,
        question: t.q,
        correct_answer: t.c,
        incorrect_answers: t.w,
      };
    });
  } catch (error) {
    console.error("Error traduciendo preguntas:", error);
    return results; // si falla la traducción, muestra en inglés antes que romperse
  }
}

export const fetchQuestions = async (category, difficulty) => {
  try {
    const url = `${API_BASE_URL}?amount=${AMOUNT_QUESTIONS}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();

    // response_code 0 = OK, cualquier otro = error
    if (!data || data.response_code !== 0 || !data.results?.length) {
      return data;
    }

    // Traducimos antes de devolver
    const resultadosTraducidos = await traducirPreguntas(data.results);

    return {
      ...data,
      results: resultadosTraducidos,
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
};
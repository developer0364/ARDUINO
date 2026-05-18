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

async function traducirPreguntas(results) {
  try {
    
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
    if (!texto) return results; 

    const traducido = JSON.parse(texto);

    
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
    return results; 
  }
}

export const fetchQuestions = async (category, difficulty) => {
  try {
    const url = `${API_BASE_URL}?amount=${AMOUNT_QUESTIONS}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();

    
    if (!data || data.response_code !== 0 || !data.results?.length) {
      return data;
    }

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
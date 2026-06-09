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

export const fetchQuestions = async (category, difficulty) => {
  try {
    const url = `${API_BASE_URL}?amount=${AMOUNT_QUESTIONS}&category=${category}&difficulty=${difficulty}&type=multiple`;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    return null;
  }
};

export interface Question {
  title: string;
  answer: string;
}

export const identifyQuestion = (index: number, question: Question) => {
  return question.title;
};

/**
 * Get Random Question from question json file
 */
import QUESTIONDATA from './questions.json'
import { getRandomQuestion } from '../../composables/questionUtils';

type QuestionData = {
    questions: any[];
};

export default defineEventHandler(async (event) => {

    const questionData = QUESTIONDATA as QuestionData;
    return getRandomQuestion(questionData.questions);
});
import { describe, expect, it } from 'vitest';
import { randomizeQuestions, getRandomQuestion, randomizeQuestionsByTag } from '../composables/questionUtils';
import QUESTIONDATA from '../server/api/questions.json';

type QuestionData = {
    questions: any[];
};

const questionData = QUESTIONDATA as QuestionData;

describe('Question randomizer', () => {
    it('works correctly!', () => {
        const testArray = questionData.questions;
        const actual = randomizeQuestions(testArray);
        expect(actual.length).toEqual(testArray.length);
        expect(actual).not.toStrictEqual(testArray);
    });
});

describe('Question getRandomQuestion', () => {
    it('works correctly!', () => {
        const testArray = questionData.questions;
        const actual = getRandomQuestion(testArray);
        expect(actual).toHaveProperty('question');
        expect(actual).toHaveProperty('tags');
    });
});

describe('Question randomizeQuestionsByTag', () => {
    // NOTE - The number variables will need to be updated
    // as new questions are added to questions.json
    it('works correctly with goal!', () => {
        const numberOfGoalQuestions = 19;
        const testArray = questionData.questions;
        const actual = randomizeQuestionsByTag(testArray, 'goal');
        expect(actual[0]).toHaveProperty('question');
        expect(actual[0]).toHaveProperty('tags');
        expect(actual.length).toEqual(numberOfGoalQuestions);
        expect(actual).not.toStrictEqual(testArray);
    });

    it('works correctly with reality!', () => {
        const numberOfRealityQuestions = 31;
        const testArray = questionData.questions;
        const actual = randomizeQuestionsByTag(testArray, 'reality');
        expect(actual[0]).toHaveProperty('question');
        expect(actual[0]).toHaveProperty('tags');
        expect(actual.length).toEqual(numberOfRealityQuestions);
        expect(actual).not.toStrictEqual(testArray);
    });

    it('works correctly with options!', () => {
        const numberOfOptionQuestions = 37;
        const testArray = questionData.questions;
        const actual = randomizeQuestionsByTag(testArray, 'option');
        expect(actual[0]).toHaveProperty('question');
        expect(actual[0]).toHaveProperty('tags');
        expect(actual.length).toEqual(numberOfOptionQuestions);
        expect(actual).not.toStrictEqual(testArray);
    });

    it('works correctly with action!', () => {
        const numberOfActionQuestions = 13;
        const testArray = questionData.questions;
        const actual = randomizeQuestionsByTag(testArray, 'will');
        expect(actual[0]).toHaveProperty('question');
        expect(actual[0]).toHaveProperty('tags');
        expect(actual.length).toEqual(numberOfActionQuestions);
        expect(actual).not.toStrictEqual(testArray);
    });
});
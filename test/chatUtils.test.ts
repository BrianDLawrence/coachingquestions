import { describe, expect, it } from 'vitest';
import { parseQuestions } from '../composables/chatUtils';

const input = `
  <QUESTIONS START>
  <Q>What specific career-related challenges or issues are you currently facing that you'd like to address in this coaching session?</Q>
  <Q>Can you tell me more about your career history, including your educational background, work experience, and any notable achievements?</Q>
  <Q>What are your short-term and long-term career goals, and what steps have you taken towards achieving them?</Q>
  <Q>How would you describe your current job satisfaction and overall career fulfillment? Are there areas where you feel particularly satisfied or dissatisfied?</Q>
  <Q>Are there any specific skills, strengths, or areas of improvement that you believe are critical to your career success, and would you like to discuss strategies for developing them?</Q>
  <QUESTIONS END>
  `;

describe('Test Parse Questions', () => {
    it('works correctly with one question input!', () => {
        const questionsArray = parseQuestions("<Q>What are your short-term and long-term career goals, and what steps have you taken towards achieving them?</Q>");
        expect(questionsArray.length).toEqual(1);
        expect(questionsArray[0]).toEqual("What are your short-term and long-term career goals, and what steps have you taken towards achieving them?")
    });
    it('works correctly with five question input!', () => {
        const questionsArray = parseQuestions(input);
        expect(questionsArray.length).toEqual(5);
        expect(questionsArray[0]).toEqual("What specific career-related challenges or issues are you currently facing that you'd like to address in this coaching session?")
        expect(questionsArray[1]).toEqual("Can you tell me more about your career history, including your educational background, work experience, and any notable achievements?")
        expect(questionsArray[4]).toEqual("Are there any specific skills, strengths, or areas of improvement that you believe are critical to your career success, and would you like to discuss strategies for developing them?")
    });
    it('works correctly with junk input!', () => {
        const questionsArray = parseQuestions("JUNK INPUT - No questions");
        expect(questionsArray.length).toEqual(0); //should return empty array
    });
});

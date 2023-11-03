// Define a type for a question. This could be an interface or type alias.
// Adjust the 'Question' type according to the actual shape of your question objects.
type Question = {
    tags: string[];
    // ... other properties of the question
};

export const randomizeQuestions = (questionsArray: Question[]): Question[] => {
    let count = questionsArray.length;
    const arrayCopy = questionsArray.slice();
    const returnArray: Question[] = [];
    while (count > 0) {
        if (arrayCopy.length) {
            const index = Math.floor(Math.random() * arrayCopy.length);
            returnArray.push(arrayCopy[index]);
            arrayCopy.splice(index, 1);
        }
        count--;
    }
    return returnArray;
}

export const getRandomQuestion = (questionArray: Question[]): Question => {
    return questionArray[Math.floor(Math.random() * questionArray.length)];
}

export const randomizeQuestionsByTag = (questionsArray: Question[], tag: string): Question[] => {
    const arrayByTag = questionsArray.filter(question => question.tags.includes(tag));
    return randomizeQuestions(arrayByTag);
}

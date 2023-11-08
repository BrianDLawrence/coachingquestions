export const parseQuestions = (input: string): string[] => {
    const regex = /<Q>(.*?)<\/Q>/g;
    const matches = input.match(regex);
    if (matches) {
        return matches.map((match) => match.replace(/<Q>|<\/Q>/g, ''));
    }
    return [];
}
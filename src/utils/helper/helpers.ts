export const getRandomWord = (word: string[]): string => {
  // Generate a random index based on the length of the array
  const randomIndex = Math.floor(Math.random() * word.length);

  // Return the word at the random index
  return word[randomIndex];
};



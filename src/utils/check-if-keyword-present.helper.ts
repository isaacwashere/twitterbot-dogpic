import { KEYWORD, START_OF_KEYWORD, END_OF_KEYWORD, ARRAY_LENGTH_OF_KEYWORD } from '../constants';
import { Twit } from '../interfaces';

/**
 * @desc Determine if the tweet contains the keyword by splitting the tweet into an array and filtering irrelevant parts out (ie the mentions, hashtags, links, and when the keyword is in quotes).
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether the tweet is a retweet
 */
export const determineIfKeyWordUsed = (tweet: Twit): boolean => {
  const normalSpacingKeywordCheck = tweetContainsKeyword(tweet);
  const spaceBetweenKeywordCheck = spacedOutKeyword(tweet);

  if (normalSpacingKeywordCheck || spaceBetweenKeywordCheck) return true;

  return false;
};

/**
 * @desc Determine if the current term in the tweet contains a character that should be ignored
 * @param {string} term - the current single term in the tweet
 * @return {boolean}
 */
export const includesIrrelevantChar = (term: string) => {
  return (
    !term.toLowerCase().includes('http') &&
    !term.toLowerCase().includes('@') &&
    !term.toLowerCase().includes("'") &&
    !term.toLowerCase().includes('"') &&
    !term.toLowerCase().includes('#')
  );
};

/**
 * @desc Determine if the tweet contains the keyword spaced out (ie. b a r k) by splitting the tweet into an array and when we see the start of the keyword, saving that index and when we see the end of the keyword, saving that index, and subtracting to see if they were consecutive and the tweet contains the keyword
 * @param {Twit} tweet - the standard tweet object
 * @return {boolean}
 */
export const spacedOutKeyword = (tweet: Twit) => {
  let startOfKeyWord = 0;
  let endOfKeyWord = 0;
  tweet.text.split(' ').forEach((term, currentIndex) => {
    if (term.toLowerCase() === START_OF_KEYWORD) startOfKeyWord = currentIndex;
    if (
      term.toLowerCase() === END_OF_KEYWORD &&
      currentIndex === startOfKeyWord + ARRAY_LENGTH_OF_KEYWORD
    )
      endOfKeyWord = currentIndex;
    return;
  });

  return endOfKeyWord - startOfKeyWord === ARRAY_LENGTH_OF_KEYWORD;
};

/**
 * @desc Determine if the tweet contains the keyword byt splitting the text of the tweet into an array, filtering out irrelevant chars, checking to see if the remainder include the keyword, then checking if those remaining terms contain the keyword without any weird letters at the end. Return if the length of the 'validTerms' array is greater than 1.
 * @param {Twit} tweet - the standard tweet object
 * @return {boolean}
 */
export const tweetContainsKeyword = (tweet: Twit) => {
  const validTerms = tweet.text
    .split(' ')
    .filter((term: string) => includesIrrelevantChar(term))
    .filter((term: string) => term.toLowerCase().includes(KEYWORD))
    .filter((term: string) => termContainsKeyWordAndNoLettersAfter(term));

  return validTerms?.length >= 1;
};

/**
 * @desc Determine if the term is the keyword without letters after it. Do this by checking to see if the first letter is the 1st letter in the keyword, if the upcoming last letter is the last letter in the keyword and if the letter after the last letter in the keyword is also a letter
 * @param {string} term - a single term to examine
 * @return {boolean} whether the term in the tweet is the keyword
 */
export const termContainsKeyWordAndNoLettersAfter = (term: string): boolean => {
  return (
    term.split('')[0] === START_OF_KEYWORD &&
    term.split('')[3] === END_OF_KEYWORD &&
    aSuffixCharExistsAndItsNotALetter(term)
  );
};

/**
 * @desc Determine if the term has a suffix char, if it doesn't then that means the keyword is present, if the suffix char is there and it is not a letter, that means we're also okay.
 * @param {string} term - a single term to examine
 * @return {boolean} whether the term in the tweet is the keyword
 */
export const aSuffixCharExistsAndItsNotALetter = (term: string) => {
  if (!term.split('')[4]) return true;
  if (term.split('')[4] && !term.split('')[4].match(/[a-z]/i)) return true;

  return false;
};

import { logger } from '../index';
import { KEYWORD, USERNAME } from '../constants';
import { Twit, TwitUserMentionsEntityEntity } from '../interfaces';
import { KeywordInTweet } from 'keyword-in-tweet';

/**
 * @desc This determines which tweets to be ignored. We're ignoring: retweets, tweets that are by the bot, tweets that the bot is not mentioned in, and tweets that do not contain the key word
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether to ignore the received tweet (ex. 'true' means ignore)
 */
export const ignoreTweet = (tweet: Twit): boolean => {
  const isBot = tweet.user.screen_name.toLowerCase() === USERNAME.toLowerCase();
  const containsKeyWord = KeywordInTweet(tweet.text, KEYWORD);
  const isRetweet = determineIfTweetIsARetweet(tweet);
  const botWasMentioned = determineIfBotMentioned(tweet);

  logger.debug(`Tweet ignore reason: `, {
    botWasMentioned,
    containsKeyWord,
    isBot,
    isRetweet,
    tweet: tweet.text,
    mentions: tweet.entities.user_mentions,
  });

  return !(botWasMentioned && containsKeyWord) || isBot || isRetweet;
};

/**
 * @desc Take the tweet, and reduce the user_mentions array down into a boolean based on if the "user's mentioned section" contains the bot.
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether the bot was mentioned in the received tweet
 */
export const determineIfBotMentioned = (tweet: Twit): boolean => {
  const mentions = tweet.entities.user_mentions;
  if (!mentions) return false;

  return mentions.reduce((acc: boolean, currVal: TwitUserMentionsEntityEntity) => {
    if (currVal.screen_name === USERNAME) {
      acc = true;
      return acc;
    }
    return acc;
  }, false);
};

/**
 * @desc Determine if the tweet received is a retweet by splitting the tweet and checking to see if the first term in the tweet is 'RT'
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether the tweet is a retweet
 */
export const determineIfTweetIsARetweet = (tweet: Twit): boolean => {
  const firstTermInTweet = tweet.text.split(' ')[0];

  return firstTermInTweet.includes('@')
    ? determineIfTweetBeforeAtContainsRT(firstTermInTweet)
    : firstTermInTweet.includes('RT');
};

/**
 * @desc Determine if the tweet that contains a mention is a retweet by splitting it at the '@' and checking to see if RT is the 1st item
 * @param {string} tweet - the text of the tweet
 * @return {boolean}
 */
export const determineIfTweetBeforeAtContainsRT = (tweet: string) => {
  return tweet.split('@')[0].includes('RT');
};

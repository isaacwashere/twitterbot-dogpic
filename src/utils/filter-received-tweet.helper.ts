import { logger } from 'src';
import { USERNAME } from '../constants';
import { Twit, TwitUserMentionsEntityEntity } from '../interfaces';

/**
 * @desc This determines which tweets to be ignored. We're ignoring: retweets, tweets that are by the bot, and tweets that the bot is not mentioned in.
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether to ignore the received tweet (ex. 'true' means ignore)
 */
export const ignoreTweet = (tweet: Twit): boolean => {
  const isBot = tweet.user.screen_name.toLowerCase() === USERNAME.toLowerCase();
  const isRetweet = determineIfTweetIsARetweet(tweet);
  const botWasMentioned = determineIfBotMentioned(tweet);

  logger.debug(`Tweet ignore reason: `, { botWasMentioned, isBot, isRetweet });

  return !botWasMentioned || isBot || isRetweet;
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
 * @desc Determine if the tweet received is a retweet by returning whether or not the tweet contains 'RT'.
 * @param {Twit} tweet - the standard Tweet object
 * @return {boolean} whether the tweet is a retweet
 */
export const determineIfTweetIsARetweet = (tweet: Twit): boolean => {
  return tweet.text.includes('RT');
};

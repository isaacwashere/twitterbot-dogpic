import {
  TWITTER_ACC_TOKEN,
  TWITTER_ACC_TOKEN_SECRET,
  TWITTER_API_KEY,
  TWITTER_API_SECRET,
} from '../constants';
import TwitTwitter from 'twit';

export const createTwitterClient = () => {
  try {
    return new TwitTwitter({
      access_token: TWITTER_ACC_TOKEN,
      access_token_secret: TWITTER_ACC_TOKEN_SECRET,
      consumer_key: TWITTER_API_KEY,
      consumer_secret: TWITTER_API_SECRET,
    });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

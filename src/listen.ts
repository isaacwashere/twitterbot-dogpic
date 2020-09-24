import { Twit } from './interfaces';
import { KEYWORD, USERNAME } from './constants';
import { logger, twitter } from './index';
import { replyWithPic } from './utils/reply-tweet-dog-pic';
import { replyWithError } from './utils/reply-tweet-error';
import { handleGetDogPic } from './utils/handle-get-dog-pic';
import { ignoreTweet } from './utils/filter-received-tweet.helper';

export const listen = () => {
  const mentionStream = twitter.stream('statuses/filter', { track: [USERNAME, KEYWORD] });

  mentionStream.on('tweet', async (tweet: Twit) => {
    const shouldIgnore = ignoreTweet(tweet);

    if (shouldIgnore) {
      logger.info(`tweet by: @${tweet.user.screen_name} being ignored...`);
      return;
    }

    logger.debug('TWEET IS: ', tweet);
    logger.info(`@${tweet.user.screen_name} wants a dog pic...`);

    const dogPic = await handleGetDogPic();

    dogPic
      ? await replyWithPic(dogPic, tweet.id_str, tweet.user.screen_name)
      : await replyWithError(tweet.in_reply_to_status_id, tweet.user.screen_name);
  });
};

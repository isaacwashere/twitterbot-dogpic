import { twitter, logger } from '../index';
import imageToBase64 from 'image-to-base64';
import { replyWithError } from './reply-tweet-error';
import { TwitMediaUploadData } from 'src/interfaces';

/**
 * @desc Use the image url and upload the pic to Twitter, then use the received media_id to create the metadata needed for the tweet, then post the tweet (as a reply) with the image
 * @param {string} pic - image url for the pic
 * @param {string} replyStatusId - status/tweet id used to tell Twitter who we're replying to
 * @param {string} user - screen name of the user we're replying to
 * @param {string} message - greeting/message to the user
 * @return {Promise<void>}
 */
export const postTweetWithImage = async (
  pic: string,
  replyStatusId: string,
  user: string,
  message: string
) => {
  const b64content = await imageToBase64(pic)
    .then(response => {
      return response.toString();
    })
    .catch(error => {
      logger.error(error);
      throw new Error(JSON.stringify(error));
    });

  twitter.post('media/upload', { media_data: b64content }, async function (
    uploadError,
    data: TwitMediaUploadData,
    _response
  ) {
    const mediaIdStr: string = data.media_id_string;
    const altText = 'doggo pic';
    const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } };
    if (uploadError) {
      await replyWithError(replyStatusId, user);
      throw new Error(JSON.stringify(uploadError));
    }

    twitter.post('media/metadata/create', meta_params, async function (
      createError,
      _data,
      _response
    ) {
      const params = {
        status: `@${user} ${message}`,
        media_ids: [mediaIdStr],
        in_reply_to_status_id: replyStatusId,
        auto_populate_reply_metadata: true,
      };
      logger.debug('Params before posting tweet: ', { params });

      if (createError) {
        await replyWithError(replyStatusId, user);
        throw new Error(JSON.stringify(createError));
      }

      twitter.post('statuses/update', params, async function (postError, _data, _response) {
        if (postError) {
          await replyWithError(replyStatusId, user);
          throw new Error(JSON.stringify(postError));
        }
        logger.info(`Replied to: @${user}`);
      });
    });
  });
};

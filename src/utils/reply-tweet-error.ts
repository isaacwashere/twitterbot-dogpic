import { twitter } from '../index';

export const replyWithError = async (replyStatusId: string, user: string) => {
  try {
    twitter.post(
      'statuses/update',
      {
        in_reply_to_status_id: replyStatusId,
        status: `@${user} My bad, I couldn't find a dog pic. Mention me again and I'll try again.`,
      },
      function (_error, _data, _response) {
        console.log(`Replied to @${user} with error...`);
      }
    );
  } catch (error) {
    console.error(JSON.stringify(error));
  }
};

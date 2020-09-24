import dotenv from 'dotenv';
import env from 'env-var';

// Attach .env variables to process.env
const environment = process.env.NODE_ENV;
if (environment !== 'production') {
  dotenv.config();
}

export const TWITTER_ACC_TOKEN = env.get('TWITTER_ACC_TOKEN').required().asString();
export const TWITTER_ACC_TOKEN_SECRET = env.get('TWITTER_ACC_TOKEN_SECRET').required().asString();
export const TWITTER_API_KEY = env.get('TWITTER_API_KEY').required().asString();
export const TWITTER_API_SECRET = env.get('TWITTER_API_SECRET').required().asString();

export const TIMEZONE = env.get('TZ').required().asString();

export const USERNAME = 'INeedADogPic';
export const APP_USERNAME = USERNAME.toLowerCase();
export const TWITTER_MENTION = `@${APP_USERNAME}`;

export const KEYWORD = '!bark!';
export const START_OF_KEYWORD = '!';
export const END_OF_KEYWORD = '!';
export const ARRAY_LENGTH_OF_KEYWORD = 5; // if the keyword were an array, what would be the index of the last item
export const LENGTH_OF_KEYWORD = 6; // if the keyword were an array, what would be the array length
export const EARLIEST_STARTING_INDEX_OF_KEYWORD = 0; // if the keyword were in an array of its letters what would the initial index be
export const EARLIEST_ENDING_INDEX_OF_KEYWORD = 5; // if the keyword were in an array of its letters what would the final index be
export const EARLIEST_SUFFIX_CHAR_INDEX_LOCATION = 6; // If there was a suffix character immediately after the last letter in the keyword, what would its index be

export const DOG_CEO_API_RANDOM = 'https://dog.ceo/api/breeds/image/random';

export const THE_DOG_API_API_KEY = env.get('THEDOGAPI_API_KEY').required().asString();
export const THE_DOG_API_URL = 'https://api.thedogapi.com/v1/images/search';

export const UNSPLASH_API_ACC_KEY = env.get('UNSPLASH_API_ACC_KEY').required().asString();
export const UNSPLASH_API_SECRET_KEY = env.get('UNSPLASH_API_SECRET_KEY').required().asString();

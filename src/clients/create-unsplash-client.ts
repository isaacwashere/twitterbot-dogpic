require('es6-promise').polyfill();
require('isomorphic-fetch');
import Unsplash from 'unsplash-js';
import { UNSPLASH_API_ACC_KEY } from '../../src/constants';

export const createUnsplashClient = (): Unsplash => {
  try {
    return new Unsplash({
      accessKey: UNSPLASH_API_ACC_KEY,
      headers: {
        'X-Custom-Header': 'foo',
      },
      timeout: 500,
    });
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

require('es6-promise').polyfill();
require('isomorphic-fetch');
import Twit = require('twit');
import Unsplash from 'unsplash-js';
import { listen } from './listen';
import { createTwitterClient } from './clients/create-twitter-client';
import { createUnsplashClient } from './clients/create-unsplash-client';

// Init Twit
export const twitter = createTwitterClient();
console.log('Twit Package started...');

// Connect to Unsplash
export const unsplash = createUnsplashClient();
console.log('Unsplash API Connected...');

listen();

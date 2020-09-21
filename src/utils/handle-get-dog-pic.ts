require('es6-promise').polyfill();
require('isomorphic-fetch');
import {
  getDogPicFromDogCEOAPI,
  getDogPicFromTheDogAPI,
  getDogPicFromUnsplash,
} from './get-dog-pic-helpers';

export const handleGetDogPic = async (): Promise<string | null> => {
  const theDogAPIDog = await getDogPicFromTheDogAPI();
  if (theDogAPIDog) return theDogAPIDog;

  const dogCEOAPIDog = await getDogPicFromDogCEOAPI();
  if (dogCEOAPIDog) return dogCEOAPIDog;

  const unsplashDog = await getDogPicFromUnsplash();
  if (unsplashDog) return unsplashDog;

  return null;
};

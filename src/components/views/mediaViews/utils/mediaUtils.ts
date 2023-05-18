import {
  faHashtag,
  faNewspaper,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export const MEDIA_SOURCES = {
  MENCIONES_TOTALES: 'menciones_totales',
  ALL: 'all',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  FORUMS: 'forums',
  REDDIT: 'reddit',
};

export const MEDIA_SOURCES_NAMES = new Map([
  [MEDIA_SOURCES.ALL, 'News'],
  [MEDIA_SOURCES.FACEBOOK, 'Facebook'],
  [MEDIA_SOURCES.TWITTER, 'Twitter'],
  [MEDIA_SOURCES.TIKTOK, 'Tiktok'],
  [MEDIA_SOURCES.REDDIT, 'Reddit'],
  [MEDIA_SOURCES.YOUTUBE, 'Youtube'],
  [MEDIA_SOURCES.FORUMS, 'Forums'],
]);

export const FA_MAP = new Map([
  [MEDIA_SOURCES.ALL, faNewspaper],
  [MEDIA_SOURCES.FACEBOOK, faFacebook],
  [MEDIA_SOURCES.TWITTER, faTwitter],
  [MEDIA_SOURCES.TIKTOK, faTiktok],
  [MEDIA_SOURCES.REDDIT, faReddit],
  [MEDIA_SOURCES.YOUTUBE, faYoutube],
  [MEDIA_SOURCES.FORUMS, faUser],
  [MEDIA_SOURCES.MENCIONES_TOTALES, faHashtag],
]);

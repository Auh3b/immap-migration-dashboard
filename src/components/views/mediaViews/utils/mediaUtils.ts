import {
  faComments,
  faHashtag,
  faMessage,
  faNewspaper,
  faSquareRss,
  faStar,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export const MEDIA_SOURCES = {
  MENCIONES_TOTALES: 'menciones_totales',
  ALL: 'all',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  TIKTOK: 'tiktok',
  SOCIAL_BLOGS: 'social_blogs',
  SOCIAL_REVIEWS: 'social_reviews',
  SOCIAL_COMMENTS: 'social_comments',
  SOCIAL_MESSAGE_BOARDS: 'social_message_boards',
  FORUMS: 'forums',
  REDDIT: 'reddit',
};

export const FA_MAP = new Map([
  [MEDIA_SOURCES.ALL, faNewspaper],
  [MEDIA_SOURCES.FACEBOOK, faFacebook],
  [MEDIA_SOURCES.TWITTER, faTwitter],
  [MEDIA_SOURCES.TIKTOK, faTiktok],
  [MEDIA_SOURCES.REDDIT, faReddit],
  [MEDIA_SOURCES.SOCIAL_BLOGS, faSquareRss],
  [MEDIA_SOURCES.SOCIAL_COMMENTS, faComments],
  [MEDIA_SOURCES.SOCIAL_REVIEWS, faStar],
  [MEDIA_SOURCES.SOCIAL_MESSAGE_BOARDS, faMessage],
  [MEDIA_SOURCES.FORUMS, faUser],
  [MEDIA_SOURCES.MENCIONES_TOTALES, faHashtag],
]);

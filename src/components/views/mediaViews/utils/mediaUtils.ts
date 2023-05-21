import {
  faHashtag,
  faNewspaper,
  faSquareRss,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faReddit,
  faTiktok,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { Filters } from 'utils/filterFunctions';

export const MEDIA_SOURCES = {
  MENCIONES_TOTALES: 'menciones_totales',
  ALL: 'all',
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  TIKTOK: 'tiktok',
  YOUTUBE: 'youtube',
  FORUMS: 'forums',
  REDDIT: 'reddit',
  SOCIAL_BLOGS: 'social_blogs',
};

export const MEDIA_SOURCES_NAMES = new Map([
  [MEDIA_SOURCES.ALL, 'News'],
  [MEDIA_SOURCES.FACEBOOK, 'Facebook'],
  [MEDIA_SOURCES.TWITTER, 'Twitter'],
  [MEDIA_SOURCES.TIKTOK, 'Tiktok'],
  [MEDIA_SOURCES.REDDIT, 'Reddit'],
  [MEDIA_SOURCES.YOUTUBE, 'Youtube'],
  [MEDIA_SOURCES.FORUMS, 'Forums'],
  [MEDIA_SOURCES.SOCIAL_BLOGS, 'Social Blogs'],
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
  [MEDIA_SOURCES.SOCIAL_BLOGS, faSquareRss],
]);

interface Summary {
  volume: number;
  sources: string[];
}

type FieldValues = [string, number];

interface SourceField {
  date: string;
  source: string;
  volume: number;
  topPhrases: FieldValues;
  sentiment: FieldValues;
  country: FieldValues;
  languages: FieldValues;
  views: number;
}

type Sources = Partial<SourceField[]>;

export interface Input {
  summary: Partial<Summary>;
  sources: Sources;
}

export interface Params {
  data?: Partial<Input>;
  filters?: Filters;
}

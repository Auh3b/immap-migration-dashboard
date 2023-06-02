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
import { UNICEF_COLORS } from 'theme';
import { grey, orange } from '@material-ui/core/colors';

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

export const SOURCE_COLOR = Object.fromEntries([
  [MEDIA_SOURCES.ALL, '#333'],
  [MEDIA_SOURCES.FACEBOOK, '#1877f2'],
  [MEDIA_SOURCES.TWITTER, '#1da1f2'],
  [MEDIA_SOURCES.TIKTOK, '#010101'],
  [MEDIA_SOURCES.REDDIT, '#ff4500'],
  [MEDIA_SOURCES.YOUTUBE, '#ff0000'],
  [MEDIA_SOURCES.FORUMS, grey[500]],
  [MEDIA_SOURCES.MENCIONES_TOTALES, '#1CABE2'],
  [MEDIA_SOURCES.SOCIAL_BLOGS, orange[500]],
]);

export const POST_URL_MAP = new Map([
  [
    MEDIA_SOURCES.TWITTER,
    (value: string) => `https://twitter.com/Interior/status/${value}`,
  ],
  [MEDIA_SOURCES.TIKTOK, (value: string) => value],
  [MEDIA_SOURCES.YOUTUBE, (value: string) => value],
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
  topPhrases: FieldValues[];
  sentiment: FieldValues[];
  country: FieldValues[];
  languages: FieldValues[];
  topPosts: FieldValues[];
  views: number;
}

type Sources = Partial<SourceField[]>;

export interface Input {
  summary: Partial<Summary>;
  sources: Sources;
}

export interface MediaParams {
  data?: Partial<Input>;
  filters?: Filters;
}

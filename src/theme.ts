import deepmerge from 'deepmerge';
import { createTheme, Theme } from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  green,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
} from '@material-ui/core/colors';
import { yellow } from '@material-ui/core/colors';
import { deepOrange } from '@material-ui/core/colors';
import { deepPurple } from '@material-ui/core/colors';
import randomiseArray from 'utils/randomiseArray';

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

interface CustomPalette extends Palette {
  appBar: PaletteColor;
}

export const EXTENDED_PALETTE: string[] = [
  red[400],
  pink[400],
  purple[400],
  deepPurple[400],
  indigo[400],
  blue[400],
  lightBlue[400],
  cyan[400],
  teal[400],
  green[400],
  lightGreen[400],
  lime[400],
  yellow[400],
  amber[400],
  orange[400],
  deepOrange[400],
  brown[400],
  blueGrey[400],
  red[800],
  pink[800],
  purple[800],
  deepPurple[800],
  indigo[800],
  blue[800],
  lightBlue[800],
  cyan[800],
  teal[800],
  green[800],
  lightGreen[800],
  lime[800],
  yellow[800],
  amber[800],
  orange[800],
  deepOrange[800],
  brown[800],
  blueGrey[800],
];

export const EXTENDED_PALETTE_RAND = randomiseArray(EXTENDED_PALETTE);

export const UNICEF_COLORS: string[] = [
  '#1CABE2',
  '#00833D',
  '#80BD41',
  '#FFC20E',
  '#F26A21',
  '#E2231A',
  '#961A49',
  '#6A1E74',
  '#D8D1C9',
  '#777779',
  '#2D2926',
  '#374EA2',
];

const customTheme = {
  palette: {
    primary: {
      main: UNICEF_COLORS[0],
    },
    secondary: {
      main: UNICEF_COLORS[0],
      light: '#71caed',
      dark: '#116b8d',
    },
    immap: {
      primary: '#a82724',
      secondary: '#1f3a5f',
      dark: '#6d6e70',
    },
    common: {},
  },
};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme as CustomTheme;

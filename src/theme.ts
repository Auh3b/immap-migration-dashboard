import deepmerge from 'deepmerge';
import { createTheme, Theme } from '@material-ui/core';
import { cartoThemeOptions } from '@carto/react-ui';
import { Palette, PaletteColor } from '@material-ui/core/styles/createPalette';

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

interface CustomPalette extends Palette {
  appBar: PaletteColor;
}

const customTheme = {
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1CABE2',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#1CABE2',
      light: '#71caed',
      dark: '#116b8d',
    },
    immap: {
      primary: '#a82724',
      secondary: '#1f3a5f',
      dark: '#6d6e70',
    },
  },
  typography: {
    fontFamily: 'Barlow',
    fontWeightLight: 300,
    fontWeightRegure: 400,
    fontWeightBold: 700,
    h1: { fontFamily: 'Barlow' },
    h2: { fontFamily: 'Barlow' },
    h3: { fontFamily: 'Barlow' },
    h4: { fontFamily: 'Barlow' },
    h5: { fontFamily: 'Barlow' },
    h6: { fontFamily: 'Barlow' },
    subtitle1: { fontFamily: 'Barlow' },
    subtitle2: { fontFamily: 'Barlow' },
    body1: { fontFamily: 'Barlow' },
    body2: { fontFamily: 'Barlow' },
    button: { fontFamily: 'Barlow' },
    caption: { fontFamily: 'Barlow', fontWeight: 300 },
    overline: { fontFamily: 'Barlow' },
  },
};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

export default theme as CustomTheme;

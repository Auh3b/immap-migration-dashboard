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
  palette:{
    primary:{
      main: '#1CABE2',
      light: '#71caed',
      dark: '#116b8d'
    },
    secondary:{
      main: '#1CABE2',
      light: '#71caed',
      dark: '#116b8d'
    },
    immap:{
      primary:'#a82724',
      secondary:'#1f3a5f',
      dark:'#6d6e70'
    }
  },
  typography:{
    fontFamily:'Roboto',
    fontWeightLight: 300,
    fontWeightRegure: 400,
    fontWeightBold: 700
  }
};

const theme = createTheme(deepmerge(cartoThemeOptions, customTheme));

console.log(theme)

export default theme as CustomTheme;

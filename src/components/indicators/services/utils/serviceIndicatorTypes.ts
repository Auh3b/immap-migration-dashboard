import { UNICEF_COLORS } from 'theme';

export const aidTypes = new Map([
  [0, 'Ninguna'],
  [1, 'Alimentación o kit de alimentación '],
  [2, 'Alojamiento temporal'],
  [3, 'Salud, primeros auxilios o atención médica '],
  [4, 'Agua'],
  [5, 'Duchas o baños'],
  [6, 'Kit de aseo o elementos de higiene'],
  [7, 'Información / asistencia legal '],
  [8, 'Ayuda psicológica'],
  [9, 'Dinero en efectivo'],
  [10, 'Transporte humanitario'],
  [11, 'Otro'],
]);

export const serviceLabels = new Map([
  [3, 'Difícil'],
  [2, 'Regular'],
  [1, 'Fácil'],
]);

export const serviceColors = new Map([
  ['Fácil','#f03b20' ],
  ['Regular', '#feb24c'],
  ['Difícil', '#ffeda0'],
]);

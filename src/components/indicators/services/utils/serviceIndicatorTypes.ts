import { UNICEF_COLORS } from 'theme';

export const aidTypes = new Map([
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

export const serviceLabels1 = new Map([
  [3, 'Difícil'],
  [2, 'Regular'],
  [1, 'Fácil'],
]);

export const serviceLabels2 = new Map([
  [3, 'Insatisfecho'],
  [2, 'Algo Satisfecho'],
  [1, 'Satisfecho'],
]);

export const serviceLabels3 = new Map([
  [3, 'No recomendaría'],
  [2, 'No estoy seguro(a)'],
  [1, 'Sí recomendaría'],
]);

export const serviceColors = new Map([
  [3, '#f03b20'],
  [2, '#feb24c'],
  [1, '#ffeda0'],
]);

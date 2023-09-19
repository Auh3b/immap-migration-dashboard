import { index } from 'd3';
import { createContext } from 'react';

export const MediaCountryContext = createContext<{
  value: number | null;
  label: string | null;
}>({ value: null, label: null });

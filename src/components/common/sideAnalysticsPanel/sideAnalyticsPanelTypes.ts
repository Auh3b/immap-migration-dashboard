import { ReactNode } from 'react';
import { FilterItem } from 'utils/filterFunctions';
import { StateSlices } from 'utils/types';

export interface FilterSource {
  stateSlice: StateSlices;
}
export interface PanelContent {
  value: number;
  title: string;
  content: ReactNode;
  icon?: ReactNode;
}
export type SidePanelChildrenProps = PanelContent[];
export interface SideAnalyticsPanelProps {
  children?: SidePanelChildrenProps;
}

export interface ActiveFiltersProps {
  filterSources: FilterSource[];
}
export type SourceProps = Record<string, Partial<ActiveFilterItemProps>>;
export interface FilterGroupProps {
  name: string;
  filters: [string, Partial<ActiveFilterItemProps>][];
  valueFormatter?: Function;
  removeFunction: Function;
}

export interface ActiveFilterItemProps extends FilterItem {
  name: string;
  source: string;
  owner: string;
  valueFormatter?: Record<string | number, string>;
  removeFilter?: Function;
}

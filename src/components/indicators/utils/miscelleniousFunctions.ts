import MethodFunc from './methodType';

export const DEFAULT_FILTER_VALUE = 999999;

export const defaultFilterFunction: MethodFunc<any[]> = (input, column, params) => {
  if (params?.filter ?? true) {
    return input.filter((d) => +d[column] !== DEFAULT_FILTER_VALUE);
  }

  return input;
};

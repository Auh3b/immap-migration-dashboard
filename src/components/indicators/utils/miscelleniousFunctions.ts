import MethodFunc from './methodType';

export const DEFAULT_FILTER_VALUE = 999999;

const filter_array = [999999, '999999'];

/**
 * Return an array of object whereby objects have been filtered out if the contact the DEFAULT_FILTER_VALUE in the target column
 */
export const defaultFilterFunction: MethodFunc<any[]> = (
  input,
  column,
  params,
) => {
  if (params?.filter ?? true) {
    return input.filter((d) => !filter_array.includes(d[column]));
  }

  return input;
};

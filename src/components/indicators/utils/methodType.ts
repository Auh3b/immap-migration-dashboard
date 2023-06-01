type MethodFunc<O> = (
  input: any[],
  column: string,
  params?: Record<any, any>,
) => O;

export default MethodFunc;

type MethodFunc = (
  input: any[],
  column: string,
  params?: Record<any, any>,
) => any[] | [] | Record<any, any> | null;

export default MethodFunc;

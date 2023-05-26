import { wrap } from 'comlink';

interface ExecuteExternalMethod {
  data: any[];
  methodName: string;
  params: Record<string, any>;
}

const MethodWorker = new Worker('utils/methods/methodWorker', {
  name: 'MethodWorker',
  type: 'module',
});

//@ts-ignore
const { executeMethod } = wrap(MethodWorker);

export default async function executeExternalMethod({
  data,
  methodName,
  params,
}: ExecuteExternalMethod) {
  const { result } = await executeMethod({ data, methodName, params });
  return result;
}

import { wrap } from 'comlink';
import { Params } from 'components/views/mediaViews/utils/mediaUtils';

const MediaWorker = new Worker(
  'components/views/mediaViews/utils/mediaWorker',
  {
    name: 'MediaWorker',
    type: 'module',
  },
);

//@ts-ignore
const { runTransform } = wrap(MediaWorker);

async function executeMethod(methodName: string, params: Partial<Params>) {
  const { result } = await runTransform(methodName, params);
  return result;
}

export default executeMethod;

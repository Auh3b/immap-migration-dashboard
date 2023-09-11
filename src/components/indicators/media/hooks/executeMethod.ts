import { wrap } from 'comlink';
import { MediaParams } from 'components/views/mediaViews/utils/mediaUtils';

const MediaWorker = new Worker(
  'components/views/mediaViews/utils/mediaWorker',
  {
    name: 'MediaWorker',
    type: 'module',
  },
);

//@ts-ignore
const { runTransform } = wrap<(items: any) => Promise<Any>>(MediaWorker);

async function executeMethod(methodName: string, params: Partial<MediaParams>) {
  const { result } = await runTransform(methodName, params);
  return result;
}

export default executeMethod;

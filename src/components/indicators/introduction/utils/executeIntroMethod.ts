import { wrap } from 'comlink';

const IntroWorker = new Worker(
  'components/indicators/introduction/utils/introWorker',
  {
    name: 'IntroWorker',
    type: 'module',
  },
);

//@ts-ignore
const { executeMethod } = wrap<(items: any) => Promise<Any>>(IntroWorker);

export default async function executeIntroMethod({
  source,
  methodName,
  column,
  params,
}: {
  source?: string;
  column?: string;
  methodName: string;
  params?: any;
}) {
  const { result } = await executeMethod({
    source,
    column,
    methodName,
    params,
  });

  return result;
}

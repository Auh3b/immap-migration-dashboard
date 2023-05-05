import { useSelector } from 'react-redux';

export default function usePageInfo() {
  //@ts-ignore
  const pageInfo = useSelector((state) => state.map.pageInfo);
  return pageInfo;
}

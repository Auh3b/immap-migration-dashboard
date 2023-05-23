import CustomWidgetWrapper from './CustomWidgetWrapper';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import TreeMapChart from '../customCharts/TreeMapChart';

export default function TreeMapWidget({
  id,
  title,
  method,
  methodParams,
  dataSource,
  column,
  filterType,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    methodParams,
  });
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      <TreeMapChart data={data} />
    </CustomWidgetWrapper>
  );
}

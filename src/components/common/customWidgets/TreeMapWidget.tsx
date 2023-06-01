import CustomWidgetWrapper from './CustomWidgetWrapper';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import TreeMapChart from '../customCharts/TreeMapChart';

export default function TreeMapWidget({
  id,
  title,
  methodName,
  methodParams,
  dataSource,
  actions,
  column,
  filterType,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    column,
    methodName,
    methodParams,
  });
  return (
    <CustomWidgetWrapper actions={actions} title={title} isLoading={isLoading}>
      <TreeMapChart
        data={data}
        filterType={filterType}
        id={id}
        dataSource={dataSource}
      />
    </CustomWidgetWrapper>
  );
}

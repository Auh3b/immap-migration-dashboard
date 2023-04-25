import CustomWidgetWrapper from './CustomWidgetWrapper';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import ColumnBarChart from './ColumnBarChart';

export default function CustomColumnBarWidget({
  title,
  id,
  dataSource,
  method,
  methodParams,
  column,
  extraProps,
  global,
}: defaultCustomWidgetProps) {
  const { data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
    global,
  });
  const { labels, colors, height } = extraProps;
  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data.length > 0 && !isLoading && (
        <ColumnBarChart
          data={data}
          labels={labels}
          colors={colors}
          height={height}
        />
      )}
    </CustomWidgetWrapper>
  );
}

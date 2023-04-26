import CustomWidgetWrapper from './CustomWidgetWrapper';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';
import ColumnBarChart from './ColumnBarChart';
import { useMemo } from 'react';
import useComparativeWidgetFilter from './hooks/useComparativeWidgetFilter';
import { aidTypes } from 'components/indicators/services/utils/serviceIndicatorTypes';

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
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    dataSource,
    method,
    column,
    methodParams,
    global,
  });
  const { labels, colors, height, parentSource, parentColumn } = extraProps;

   const _comparativeSelection = useComparativeWidgetFilter({
    dataSource: parentSource as string,
    column: parentColumn as string,
  });

  const selectParentCategory = useMemo(
    () => _comparativeSelection.map((d:string | number) => aidTypes.get(+d)),
    [_comparativeSelection],
  );
 
  const data = useMemo(()=>{
    let output: any[] = []
    if(selectParentCategory.length > 0 && selectParentCategory[0]){
      for (let category of selectParentCategory){
        const qualifiedData = _data.filter(({name})=> name === category)
        output = [...output, ...qualifiedData]
      }
      return output
    }
    output = _data
    return output
  }, [_data, _comparativeSelection, selectParentCategory])

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

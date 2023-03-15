import { ComparativeCategoryWidgetUI, WrapperWidgetUI } from '@carto/react-ui';
import { useMemo, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';

export default function CustomComparativeCategoryWidget({
  id,
  title,
  method,
  methodParams,
  column,
  labels,
  colorMap,
  dataSource,
}: defaultCustomWidgetProps) {
  const [data, setData] = useState<null | any[]>(null);
  const [names, setNames] = useState<null | string[]>(null);
  const [colors, setColors] = useState<null | string[]>(null)
  const {
    data: _data,
    isLoading,
    error,
  } = useWidgetFetch({
    id,
    method,
    column,
    dataSource,
    methodParams,
  });

  useMemo(() => {
    let output: any[];
    if (_data) {
      const _names = _data.map(([nameValue]) => nameValue);
      setNames(_names);
      const _colors = _names.map(name => colorMap.get(name))
      setColors(_colors)
      const _packedData = _data.map(([name, value]) => Array.from(value));
      const _unpackedData = _packedData.map((group) => {
        let newGroup: any[] = [];
        for (let d of group) {
          newGroup.push({
            //@ts-ignore
            name: d[0],
            //@ts-ignore
            value: d[1],
          });
        }
        return newGroup;
      });
      setData(_unpackedData);
    }
  }, [_data]);

  return (
    <WrapperWidgetUI title={title} isLoading={isLoading}>
      {data && names && (
        <ComparativeCategoryWidgetUI
          data={data}
          // labels={labels}
          names={names}
          colors={colors}
        />
      )}
    </WrapperWidgetUI>
  );
}

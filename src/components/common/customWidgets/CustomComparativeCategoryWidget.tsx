//@ts-nocheck
import { ComparativeCategoryWidgetUI } from '@carto/react-ui';
import { lazy, useMemo, useState } from 'react';
import { defaultCustomWidgetProps } from './customWidgetsType';
import useWidgetFetch from './hooks/useWidgetFetch';

const CustomWidgetWrapper = lazy(()=> import('components/common/customWidgets/CustomWidgetWrapper'))

export default function CustomComparativeCategoryWidget({
  id,
  title,
  method,
  methodParams,
  column,
  colorMap,
  dataSource,
}: defaultCustomWidgetProps) {
  const [data, setData] = useState<null | any[]>(null);
  const [names, setNames] = useState<null | string[]>(null);
  const [colors, setColors] = useState<null | string[]>(null);
  const { data: _data, isLoading } = useWidgetFetch({
    id,
    method,
    column,
    dataSource,
    methodParams,
  });

  useMemo(() => {
    if (_data) {
      //@ts-ignore
      const _names = _data.map(([nameValue]) => nameValue);
      setNames(_names);
      const _colors = _names.map((name) => colorMap.get(name));
      setColors(_colors);
      //@ts-ignore
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
  }, [_data, colorMap]);

  return (
    <CustomWidgetWrapper title={title} isLoading={isLoading}>
      {data && names && (
        <ComparativeCategoryWidgetUI
          data={data}
          tooltipFormatter={() => null}
          names={names}
          colors={colors}
        />
      )}
    </CustomWidgetWrapper>
  );
}

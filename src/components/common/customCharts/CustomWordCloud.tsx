import React, { useMemo } from 'react';
import ReactEcharts from './ReactEcharts';

export default function CustomWordCloud({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  console.log(data, Object.keys(data[0]))
  const series = useMemo(
    () => [
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem(params: any, api: any) {
          const categoryIndex = api.value(0)
          const valueIndex = api.value(1)
          console.log(categoryIndex, valueIndex)
          return {
            type: 'text',
            style:{
              text: api.value(0)
            }
          };
        },
        data: data.map(d => Object.values(d)),
      },
    ],
    [data],
  );
  const option = useMemo(
    () => ({
      tooltip: {},
      series,
    }),
    [series],
  );
  return <ReactEcharts opts={{renderer: 'svg'}} option={option} />;
}

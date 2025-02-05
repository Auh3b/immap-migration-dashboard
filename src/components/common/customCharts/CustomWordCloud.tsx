import { useCallback, useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import cloud from 'd3-cloud';
import { makeStyles, useTheme } from '@material-ui/core';
import { extent, median, scaleSequential } from 'd3';
import { numberFormatter } from 'utils/formatter';

const margin = {
  top: 10,
  left: 10,
  right: 10,
  bottom: 10,
};

const useStyles = makeStyles(() => ({
  root: {
    '& svg': {},
    '& text': {
      dominantBaseline: 'unset',
      y: '0',
    },
  },
}));

export default function CustomWordCloud({
  data: _data = [],
  onWordSelectChange,
  selectedWords,
  height = 400,
  width = 350,
}: {
  data: { name: string; value: number }[];
  onWordSelectChange?: (values: any) => void;
  selectedWords?: string[];
  width?: number;
  height?: number;
}) {
  const classes = useStyles({ height });
  const theme = useTheme();

  const data = useMemo(() => {
    if (_data.length === 0) {
      return [];
    }

    let output: any[] = [];
    const words = _data.map(({ name: text, value: size }) => ({
      text,
      size,
      value: size,
    }));
    const exponent = Math.floor(
      Math.log10(median(_data.map(({ value }) => value))),
    );

    const wCloud = cloud()
      .size([
        width - margin.left - margin.top,
        height - margin.right - margin.left,
      ])
      .words(words)
      .rotate(0)
      .padding(8)
      .fontSize((d) => Math.sqrt(d.size / 10 ** exponent) * 12)
      .on('word', ({ x, y, text, size, font, value }: any) => {
        output = [...output, [x, y, text, size, font, value]];
      });
    wCloud.start();

    return output;
  }, [_data]);

  const getColor = useCallback(
    (value) => {
      const colorScale = scaleSequential(['#fd8d3c', '#800026']).domain([
        ...extent(data, (d) => d[3]),
      ]);
      return colorScale(value);
    },
    [data],
  );

  const series = useMemo(
    () => [
      {
        type: 'custom',
        coordinateSystem: 'none',
        renderItem(params: any, api: any) {
          const x = api.value(0);
          const y = api.value(1);
          const text = api.value(2);
          const size = api.value(3);
          const font = api.font({
            fontSize: size,
            fontWeight: 'bold',
          });

          return {
            type: 'group',
            width: '80%',
            height: '80%',
            children: [
              {
                type: 'text',
                x,
                y,
                style: {
                  text,
                  font,
                  textAlign: 'center',
                  textVerticalAlign: 'bottom',
                  fill: selectedWords.includes(text)
                    ? '#253494'
                    : getColor(size),
                },
              },
            ],
          };
        },
        data: data,
      },
    ],
    [data, selectedWords],
  );
  const option = useMemo(
    () => ({
      tooltip: {
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 16,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        formatter(params: any) {
          return `<span style='padding: 16px; font-weight: bold;'>${numberFormatter(
            params.value.at(-1),
          )}</span>`;
        },
      },
      series,
    }),
    [series],
  );

  const onClick = useCallback(
    ({ value: [x, y, text, ...rest] }) => {
      let newWords = [...selectedWords];

      const selectedCategoryIdx = newWords.indexOf(text);
      if (selectedCategoryIdx === -1) {
        newWords.push(text);
      } else {
        newWords.splice(selectedCategoryIdx, 1);
      }
      onWordSelectChange(newWords);
    },
    [data, selectedWords, onWordSelectChange],
  );

  return (
    <ReactEcharts
      onEvents={{ click: onClick }}
      option={option}
      className={classes.root}
      style={{ width, height }}
    />
  );
}

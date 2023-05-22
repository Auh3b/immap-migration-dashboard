import { useCallback, useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import cloud from 'd3-cloud';
import { makeStyles, useTheme } from '@material-ui/core';
import {
  extent,
  interpolateYlGnBu,
  interpolateYlOrRd,
  max,
  median,
  scaleSequential,
} from 'd3';
import { numberFormatter } from 'utils/formatter';
import { useDispatch } from 'react-redux';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';
import { addMediaFilter } from 'store/mediaSlice';
import { FilterTypes } from 'utils/filterFunctions';

const width = 450;
const height = 400;

const margin = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& svg': {},
    '& text': {
      dominantBaseline: 'unset',
      y: '0',
    },
  },
}));

export default function CustomWordCloud({
  data: _data,
  filters,
  id,
}: {
  data: { name: string; value: number }[];
  filters?: any;
  id?: string;
}) {
  const dispatch = useDispatch();
  const classes = useStyles({ height });
  const theme = useTheme();
  const [selectedWord = ''] = getSourceFilter(id, filters);

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
      .padding(5)
      .font('Barlow')
      .fontSize((d) => Math.sqrt(d.size / 10 ** exponent) * 15)
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
          const fontFamily = api.value(4);
          const font = api.font({
            fontSize: size,
            fontFamily,
            fontWeight: 'bold',
          });

          return {
            type: 'text',
            x,
            y,
            style: {
              text,
              font,
              textAlign: 'middle',
              textVerticalAlign: 'middle',
              fill: selectedWord === text ? '#253494' : getColor(size),
            },
          };
        },
        data: data,
      },
    ],
    [data, selectedWord],
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
    ({ value }: any) => {
      const [x, y, text, ...rest] = value;
      dispatch(
        addMediaFilter({
          owner: id,
          source: 'meltwater',
          values: [text],
          column: 'topPhrases',
          type: FilterTypes.WORD_CLOUD_IN,
        }),
      );
    },
    [data, dispatch],
  );

  return (
    <ReactEcharts
      onEvents={{ click: onClick }}
      opts={{ renderer: 'svg' }}
      option={option}
      className={classes.root}
      style={{ width, height }}
    />
  );
}

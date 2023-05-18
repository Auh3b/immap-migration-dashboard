import { useCallback, useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import cloud from 'd3-cloud';
import { makeStyles, useTheme } from '@material-ui/core';
import { extent, interpolateCividis, scaleSequential } from 'd3';

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
    '& svg': {
      // height: ({height}:any) => height ? height : 300,
    },
    '& text': {
      dominantBaseline: 'unset',
      y: '0',
    },
  },
}));

export default function CustomWordCloud({
  data: _data,
}: {
  data: { name: string; value: number }[];
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
    }));
    const wCloud = cloud()
      .size([
        width - margin.left - margin.top,
        height - margin.right - margin.left,
      ])
      .words(words)
      .rotate(0)
      .padding(5)
      .font('Barlow')
      .fontSize((d) => Math.sqrt(d.size / 1000) * 15)
      .on('word', ({ x, y, text, size, font }: any) => {
        output = [...output, [x, y, text, size, font]];
      });
    wCloud.start();

    return output;
  }, [_data]);

  const getColor = useCallback(
    (value) => {
      const colorScale = scaleSequential(interpolateCividis).domain(
        extent(data, (d) => d[3]),
      );
      return colorScale(value);
    },
    [_data],
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
              fill: getColor(size),
            },
          };
        },
        data: data,
      },
    ],
    [data],
  );
  const option = useMemo(
    () => ({
      tooltip: {
        padding: [theme.spacing(0.5), theme.spacing(1)],
        borderWidth: 0,
        textStyle: {
          ...theme.typography.caption,
          fontSize: 12,
          lineHeight: 16,
          color: theme.palette.common.white,
        },
        //@ts-ignore
        backgroundColor: theme.palette.other.tooltip,
        formatter(params: any) {
          console.log(params);
          return `<span>${params.value}</span>`;
        },
      },
      series,
    }),
    [series],
  );
  return (
    <ReactEcharts
      opts={{ renderer: 'svg' }}
      option={option}
      className={classes.root}
      style={{ width, height }}
    />
  );
}

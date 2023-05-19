import { useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import { EChartsReactProps } from 'echarts-for-react';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';

interface CustomChartProps extends EChartsReactProps {
  data: [[string, string, number][], [string, string, number][]][];
}

export default function CustomGriddedLineChart({
  data: _data = [],
  style = {height: 300},
  opts,
}: Partial<CustomChartProps>) {
  const theme = useTheme();

  const grid = useMemo(() => {
    let output: any[] = [
      {
        left: '3%',
        top: '15%',
        width: '25%',
        containLabels: true,
      },
      {
        left: '35%',
        top: '15%',
        width: '25%',
        containLabels: true,
      },
      {
        left: '70%',
        top: '15%',
        width: '25%',
        containLabels: true,
      },
    ];
    return output;
  }, [_data]);

  const yAxis = useMemo(() => {
    let output: any[] = [];
    for (let i = 0; i < _data.length; i++) {
      const axisConfig = {
        gridIndex: i,
        type: 'value',
        axisLabel: {
          formatter(value: number) {
            return format('~s')(value);
          },
        },
      };
      output = [...output, axisConfig];
    }
    return output;
  }, [_data]);

  const xAxis = useMemo(() => {
    let output: any[] = [];
    for (let i = 0; i < _data.length; i++) {
      const axisConfig = {
        gridIndex: i,
        type: 'category',
        data: _data[i][0].map((d) => d[0]),
      };
      output = [...output, axisConfig];
    }
    return output;
  }, [_data]);

  const title = useMemo(() => {
    const layout = [
      { left: '0%', top: '0%' },
      { left: '35%', top: '0%' },
      { left: '70%', top: '0%' },
    ];
    let output: any[] = [];

    for (let i = 0; i < _data.length; i++) {
      const name = _data[i][0][0][1];
      output = [...output, { text: name.toUpperCase(), ...layout[i] }];
    }
    return output;
  }, [_data]);

  const series = useMemo(() => {
    let output: any[] = [];
    for (let i = 0; i < _data.length; i++) {
      for (let j = 0; j < _data[i].length; j++) {
        const name = _data[i][j][0][1];
        const seriesName = `${name.toUpperCase()} ${j === 0 ? 'Views' : 'Posts'}`;
        const seriesConfig = {
          xAxisIndex: i,
          yAxisIndex: i,
          type: 'line',
          name: seriesName,
          data: _data[i][j].map((d) => d[2]),
        };
        output = [...output, seriesConfig];
      }
    }
    return output;
  }, [_data]);

  const dataZoom = useMemo(()=>{
    let output: any[] = [];
    for (let i = 0; i < _data.length; i++) {
      const zoomConfig = {
          xAxisIndex: i,
          type: 'inside',
      };
      output = [...output, zoomConfig];
    }
    return output;
  }, [_data])

  const legend = useMemo(()=>{
    const layout = [
      { left: '7%', top: '0%' },
      { left: '43%', top: '0%' },
      { left: '75%', top: '0%' },
    ];
    let output: any[] = [];
    for (let i = 0; i < _data.length; i++) {
      let legendConfig = {
          ...layout[i],
      };
      let data: any[] = []
      for (let j = 0; j < _data[i].length; j++) {
        const name = _data[i][j][0][1];
        const seriesName = `${name.toUpperCase()} ${j === 0 ? 'Views' : 'Posts'}`;
        data = [...data, {name: seriesName, icon: 'circle'}]
      }

      output = [...output, {...legendConfig, data}];
    }
    return output;
  }, [_data, ])

  const staticOptions = {
    tooltip: {
      trigger: 'axis',
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
    },
  };

  const option = useMemo(
    () => ({
      title,
      legend,
      grid,
      dataZoom,
      yAxis,
      xAxis,
      series,
      ...staticOptions,
    }),
    [series, grid, xAxis, yAxis],
  );
  console.log(option);
  return <ReactEcharts option={option} opts={opts} style={style} />;
}

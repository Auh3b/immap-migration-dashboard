import { useMemo } from 'react';
import ReactEcharts from './ReactEcharts';
import { EChartsReactProps } from 'echarts-for-react';
import { format } from 'd3';
import { useTheme } from '@material-ui/core';
import { UNICEF_COLORS } from 'theme';

interface CustomChartProps extends EChartsReactProps {
  data: [[string, string, number][], [string, string, number][]][];
}

export default function CustomGriddedLineChart({
  data: _data = [],
  style = { height: 600 },
  opts,
}: Partial<CustomChartProps>) {
  const theme = useTheme();

  const grid = useMemo(() => {
    if (_data.length === 0) {
      return [];
    }
    let output: any[] = [
      {
        left: '3%',
        top: '15%',
        width: '25%',
        height: '35%',
        containLabels: true,
      },
      {
        left: '3%',
        top: '65%',
        bottom: '5%',
        width: '25%',
        containLabels: true,
      },
      {
        left: '35%',
        top: '15%',
        width: '25%',
        height: '35%',
        containLabels: true,
      },
      {
        left: '35%',
        top: '65%',
        bottom: '5%',
        width: '25%',
        containLabels: true,
      },
      {
        left: '70%',
        top: '15%',
        width: '25%',
        height: '35%',
        containLabels: true,
      },
      {
        left: '70%',
        top: '65%',
        bottom: '5%',
        width: '25%',
        containLabels: true,
      },
    ];
    return output;
  }, [_data]);

  const yAxis = useMemo(() => {
    let output: any[] = [];
    for (let i = 0; i < _data.length * 2; i++) {
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
      for (let j = 0; j < _data[i].length; j++) {
        const axisConfig = {
          type: 'category',
          data: _data[i][j].map((d) => d[0]),
        };
        output = [...output, axisConfig];
      }
    }
    return output.map((d, i) => ({ ...d, gridIndex: i }));
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
        const seriesName = `${name.toUpperCase()} ${
          j === 0 ? 'Views' : 'Posts'
        }`;
        const seriesConfig = {
          xAxisIndex: i * (j + 1),
          yAxisIndex: i * (j + 1),
          type: 'line',
          name: seriesName,
          data: _data[i][j].map((d) => d[2]),
        };
        output = [...output, seriesConfig];
      }
    }
    return output.map((d, i) => ({ ...d, xAxisIndex: i, yAxisIndex: i }));
  }, [_data]);

  const dataZoom = useMemo(() => {
    let output: any[] = [];
    for (let i = 0; i < _data.length * 2; i++) {
      const zoomConfig = {
        xAxisIndex: i,
        type: 'inside',
      };
      output = [...output, zoomConfig];
    }
    return output;
  }, [_data]);

  const legend = useMemo(() => {
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
      let data: any[] = [];
      for (let j = 0; j < _data[i].length; j++) {
        const name = _data[i][j][0][1];
        const seriesName = `${name.toUpperCase()} ${
          j === 0 ? 'Views' : 'Posts'
        }`;
        data = [...data, { name: seriesName, icon: 'circle' }];
      }

      output = [...output, { ...legendConfig, data }];
    }
    return output;
  }, [_data]);

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

  const option = useMemo(() => {
    if (_data.length === 0) {
      return {};
    }

    return {
      color: UNICEF_COLORS,
      title,
      legend,
      grid,
      dataZoom,
      yAxis,
      xAxis,
      series,
      ...staticOptions,
    };
  }, [series, grid, xAxis, yAxis, title, legend, dataZoom]);

  return (
    <ReactEcharts
      option={option}
      notMerge={true}
      opts={{ renderer: 'svg' }}
      style={style}
    />
  );
}

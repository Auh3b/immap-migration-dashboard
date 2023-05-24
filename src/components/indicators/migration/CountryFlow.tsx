import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomSunburstWidget from 'components/common/customWidgets/CustomSunburstWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import {
  ascending,
  color,
  interpolateSinebow,
  scaleOrdinal,
  scaleSequential,
  sum,
} from 'd3';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';
import { UNICEF_COLORS } from 'theme';
import ExpandChartButton from 'components/common/ExpandChartButton';

const COLOR_SCALE_TYPE = {
  SEQUENTIAL: 'sequential',
  ORDINAL: 'ordinal',
};

function getChildrenLength(input: any[]): number {
  return sum(input, (v) => v.value);
}

function filterUnwantedValues(input: any[], column: string) {
  return input.filter((d) => +d[column] !== 999999);
}

function getChildren(input: any[], column: string): any[] {
  return groupCategories(input, column);
}

function getFilteredInput(input: any[], column: string, value: string): any[] {
  return filterUnwantedValues(input, column).filter((d) => d[column] === value);
}

function getOrdinalColorScale(domain: string[]) {
  return scaleOrdinal().domain(domain).range(UNICEF_COLORS);
}

function getSequantialColorScale(range: [number, number]) {
  const scale = scaleSequential(interpolateSinebow).domain(range);
  return scale;
}

const getColorScale = new Map<string, Function>([
  ['ordinal', getOrdinalColorScale],
  ['sequential', getSequantialColorScale],
]);

function getUniqueValue(input: any[], columns: string[]) {
  let values = new Set<string>();
  for (let column of columns) {
    for (let i = 0; i < input.length; i++) {
      values.add(input[i][column]);
    }
  }
  const uniqueValues = Array.from(values).sort((a, b) => ascending(a, b));
  return uniqueValues;
}

function getColorMap(
  values: string[],
  colorScale: Function,
  colorScaleType: string,
) {
  const valueColor = new Map();
  const { ORDINAL, SEQUENTIAL } = COLOR_SCALE_TYPE;
  switch (colorScaleType) {
    case ORDINAL: {
      for (let value of values) {
        valueColor.set(
          value,
          color(colorScale(value)).copy({ opacity: 0.1 }).formatHex(),
        );
      }
      break;
    }
    case SEQUENTIAL: {
      for (let i = 0; i < values.length; i++) {
        valueColor.set(
          values[i],
          color(colorScale(i)).copy({ opacity: 0.1 }).formatHex(),
        );
      }
      break;
    }
  }
  return valueColor;
}

function getColors(input: any[], columns: string[], colorScaleType: string) {
  const uniqueValues = getUniqueValue(input, columns);
  const colorScale = getColorScale.get(colorScaleType)(
    colorScaleType === COLOR_SCALE_TYPE.SEQUENTIAL
      ? [0, uniqueValues.length]
      : uniqueValues,
  );
  const colorMap = getColorMap(uniqueValues, colorScale, colorScaleType);
  return colorMap;
}

function getHierarchy(input: any[], column: string, params?: Record<any, any>) {
  const { lv2, lv3, colorScaleType } = params;
  //@ts-ignore
  const levels = [column, lv2, lv3];
  const colors = getColors(input, levels, colorScaleType);
  const children1 = groupCategories(input, column);
  const childrenNamesLv1 = children1.map(({ name }) => name);

  let nest: any[] = [];

  for (let i = 0; i < childrenNamesLv1.length; i++) {
    const name = childrenNamesLv1[i];
    const slice1 = getFilteredInput(input, levels[0], name);
    const children2 = getChildren(slice1, levels[1]);
    const childrenNamesLv2 = children2.map(({ name }) => name);
    const value = getChildrenLength(children2);
    const itemStyle = {
      color: colors.get(name) || '#999999',
    };
    let newChildren: any[] = [];

    for (let j = 0; j < childrenNamesLv2.length; j++) {
      const name = childrenNamesLv2[j];
      const slice2 = getFilteredInput(slice1, levels[1], name);
      const children3 = getChildren(slice2, levels[2]);
      const value = getChildrenLength(children3);
      const itemStyle = {
        color: colors.get(name) || '#999999',
      };

      newChildren.push({
        name,
        value,
        children: children3.map((d) => ({
          ...d,
          level: 'País del flujo inicia',
          itemStyle: { color: colors.get(d.name) },
        })),
        level: 'País después de un año',
        itemStyle,
      });
    }

    nest.push({
      name,
      value,
      level: 'País de nacimiento',
      children: newChildren,
      itemStyle,
    });
  }

  const legend: any[] = [];
  colors.forEach((v, k) => {
    if (+k !== 999999) {
      legend.push({
        name: k,
        color: v,
      });
    }
  });

  return {
    data: nest,
    legend,
  };
}

const NOTE = 'Migración de flujo de país';
const id = 'Country Flow';
const title = 'Migración de flujo de país';
const column = 'e08_pais_';
const filterType = _FilterTypes.IN;
const method = getHierarchy;
const methodParams = {
  lv2: 'e12_pais_',
  lv3: 'e10_pais_',
  colorScaleType: COLOR_SCALE_TYPE.SEQUENTIAL,
};

const props = {
  id,
  title,
  column,
  filterType,
  method,
  methodParams,
};

export default function CountryFlow({ dataSource }: BasicWidgetType) {
  const { widget } = useWidgetEffect(
    <CustomSunburstWidget
      actions={[
        <ExpandChartButton
          dataSource={dataSource}
          chartUrl='indicators/migration/CountryFlow'
        />,
      ]}
      dataSource={dataSource}
      {...props}
    />,

    [dataSource],
  );

  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}

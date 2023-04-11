import { _FilterTypes } from '@carto/react-core';
import { Grid } from '@material-ui/core';
import { BasicWidgetType } from 'components/common/customWidgets/basicWidgetType';
import CustomSunburstWidget from 'components/common/customWidgets/CustomSunburstWidget';
import WidgetNote from 'components/common/customWidgets/WidgetNote';
import { scaleOrdinal, sum } from 'd3';
import groupCategories from '../utils/groupCategories';
import useWidgetEffect from '../utils/useWidgetEffect';

const CUSTOM_COLOR_RANGE = [
  '#1CABE2',
  '#00833D',
  '#FFC20E',
  '#F26A21',
  '#961A49',
  '#6A1E74',
  '#374EA2',
  '#777779',
  '#80BD41',
];

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

function getColorScale(range: string[]) {
  return scaleOrdinal().domain(range).range(CUSTOM_COLOR_RANGE);
}

function getColors(input: any[], columns: string[]) {
  const values: string[] = [];

  for (let column of columns) {
    for (let i = 0; i < input.length; i++) {
      values.push(input[i][column]);
    }
  }

  const uniqueValues = Array.from(new Set(values));
  const colorScale = getColorScale(uniqueValues);

  const valueColor = new Map();

  for (let value of uniqueValues) {
    valueColor.set(value, colorScale(value));
  }

  return valueColor;
}

function getHierarchy(input: any[], column: string, params?: Record<any, any>) {
  //@ts-ignore
  const levels = [column, params.lv2, params.lv3];
  const colors = getColors(input, levels);
  const children1 = groupCategories(input, column);
  const childrenNamesLv1 = children1.map(({ name }) => name);

  const nest: any[] = [];

  for (let i = 0; i < childrenNamesLv1.length; i++) {
    const name = childrenNamesLv1[i];
    const slice1 = getFilteredInput(input, levels[0], name);
    const children2 = getChildren(slice1, levels[1]);
    const childrenNamesLv2 = children2.map(({ name }) => name);
    const value = getChildrenLength(children2);
    const itemStyle = {
      color: colors.get(name) || '#999999',
    };
    const newChildren: any[] = [];

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
    <CustomSunburstWidget dataSource={dataSource} {...props} />,
    [dataSource],
  );
  return (
    <Grid item>
      {widget}
      <WidgetNote note={NOTE} />
    </Grid>
  );
}

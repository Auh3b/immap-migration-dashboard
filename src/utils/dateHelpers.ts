import { defaultFilterFunction } from 'components/indicators/utils/miscelleniousFunctions';
import { extent } from 'd3';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfDay,
  endOfMonth,
  endOfQuarter,
  endOfWeek,
  endOfYear,
  format,
  fromUnixTime,
  getDay,
  getMonth,
  getQuarter,
  getUnixTime,
  getWeek,
  getYear,
} from 'date-fns';

export function getUnixTimestamp(date: Date) {
  return getUnixTime(date);
}

export function fromUnixTimestamp(value: number) {
  return fromUnixTime(value);
}

enum intervalsPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

type IntervalLookFunction = Record<intervalsPeriod, Function>;

const intervalPeriodFunction: IntervalLookFunction = Object.fromEntries([
  [intervalsPeriod.WEEK, endOfWeek],
  [intervalsPeriod.MONTH, endOfMonth],
  [intervalsPeriod.QUARTER, endOfQuarter],
  [intervalsPeriod.YEAR, endOfYear],
]);

const intervalValueFunction: IntervalLookFunction = Object.fromEntries([
  [intervalsPeriod.DAY, getDay],
  [intervalsPeriod.WEEK, getWeek],
  [intervalsPeriod.MONTH, getMonth],
  [intervalsPeriod.QUARTER, getQuarter],
  [intervalsPeriod.YEAR, getYear],
]);

const intervalNameFunction: IntervalLookFunction = Object.fromEntries([
  [intervalsPeriod.DAY, (date: Date) => format(date, 'ee')],
  [intervalsPeriod.WEEK, (date: Date) => format(date, 'ww')],
  [intervalsPeriod.MONTH, (date: Date) => format(date, 'MMM')],
  [intervalsPeriod.QUARTER, (date: Date) => format(date, 'QQQ')],
  [intervalsPeriod.YEAR, (date: Date) => format(date, 'yyyy')],
]);

export function getInterval(date: Date, interval: intervalsPeriod) {
  const _start = date;
  const _end = intervalPeriodFunction[interval](date);
  const start = getUnixTimestamp(_start);
  const end = getUnixTimestamp(_end);
  const intervalValue: number = intervalValueFunction[interval](date);
  const name: string = intervalNameFunction[interval](date);
  return {
    name,
    intervalValue,
    start,
    end,
  };
}

export function getTemporalFilters(
  input: any[],
  column: string,
  params?: Record<string, any>,
) {
  const dates = defaultFilterFunction(input, column).map((d) => d[column]);
  const output: Record<string, any> = {};
  const [start, end] = extent(dates.map((d) => +d));
  const years = eachYearOfInterval({
    start,
    end,
  });

  for (let year of years) {
    let _yearOutput = getInterval(year, intervalsPeriod.YEAR);
    let yearChildren: any = [];
    let quarters = eachQuarterOfInterval({
      start: fromUnixTimestamp(_yearOutput.start),
      end: fromUnixTimestamp(_yearOutput.end),
    });

    for (let quarter of quarters) {
      let _quarterOutput = getInterval(quarter, intervalsPeriod.QUARTER);

      let months = eachMonthOfInterval({
        start: fromUnixTimestamp(_quarterOutput.start),
        end: fromUnixTimestamp(_quarterOutput.end),
      });
      let quarterChildren: any[] = [];

      for (let month of months) {
        let _monthOutput = getInterval(month, intervalsPeriod.MONTH);
        let weeks = eachWeekOfInterval({
          start: fromUnixTimestamp(_monthOutput.start),
          end: fromUnixTimestamp(_monthOutput.end),
        });
        let monthChildren: any[] = [];
        for (let week of weeks) {
          let _weekOutput = getInterval(week, intervalsPeriod.WEEK);
          let days = eachDayOfInterval({
            start: fromUnixTimestamp(_weekOutput.start),
            end: fromUnixTimestamp(_weekOutput.end),
          }).map((d) => ({
            name: intervalNameFunction[intervalsPeriod.DAY](d),
            start: getUnixTimestamp(d),
            end: getUnixTimestamp(endOfDay(d)),
          }));
          monthChildren = [
            ...monthChildren,
            { ..._weekOutput, children: days },
          ];
        }
        quarterChildren = [
          ...quarterChildren,
          { ..._monthOutput, children: monthChildren },
        ];
      }
      yearChildren = [
        ...yearChildren,
        { ..._quarterOutput, children: quarterChildren },
      ];
    }

    output[_yearOutput.name] = { ..._yearOutput, children: yearChildren };
  }

  return output;
}

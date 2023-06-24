import { defaultFilterFunction } from 'components/indicators/utils/miscelleniousFunctions';
import { extent } from 'd3';
import {
  // eachDayOfInterval,
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
  isWithinInterval,
  startOfDay,
  startOfMonth,
  startOfQuarter,
  startOfWeek,
  startOfYear,
} from 'date-fns';

enum intervalsPeriod {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
}

type IntervalLookFunction = Record<intervalsPeriod, Function>;

const intervalStartFunction: IntervalLookFunction = Object.fromEntries([
  [intervalsPeriod.DAY, startOfDay],
  [intervalsPeriod.WEEK, startOfWeek],
  [intervalsPeriod.MONTH, startOfMonth],
  [intervalsPeriod.QUARTER, startOfQuarter],
  [intervalsPeriod.YEAR, startOfYear],
]);

const intervalPeriodFunction: IntervalLookFunction = Object.fromEntries([
  [intervalsPeriod.DAY, endOfDay],
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
  [intervalsPeriod.DAY, (date: Date) => format(date, 'dd')],
  [intervalsPeriod.WEEK, (date: Date) => format(date, 'ww')],
  [intervalsPeriod.MONTH, (date: Date) => format(date, 'MMM')],
  [intervalsPeriod.QUARTER, (date: Date) => format(date, 'QQQ')],
  [intervalsPeriod.YEAR, (date: Date) => format(date, 'yyyy')],
]);

export function formatDate(date: number | Date): string {
  const stringFormat = 'yyyy-MM-dd';
  let targetDate: Date;
  if (typeof date === 'number') {
    targetDate = fromUnixTimestamp(date);
  } else {
    targetDate = date;
  }

  return format(targetDate, stringFormat);
}

export function getUnixTimestamp(date: Date) {
  return getUnixTime(date) * 1000;
}

export function fromUnixTimestamp(value: number) {
  return fromUnixTime(value / 1000);
}

export function getInterval(date: Date, interval: intervalsPeriod) {
  const _start = date;
  const _end = intervalPeriodFunction[interval](date);
  const start = getUnixTimestamp(_start);
  const end = getUnixTimestamp(_end);
  const intervalValue: number = intervalValueFunction[interval](date);
  const name: string = intervalNameFunction[interval](date);
  const intervalCategory = interval;
  return {
    name,
    intervalValue,
    intervalCategory,
    start,
    end,
  };
}

function isWithTargetInterval(target: { start: Date; end: Date }) {
  return (date: Date, intervalType: intervalsPeriod) => {
    const start = intervalStartFunction[intervalType](target.start);
    const end = intervalStartFunction[intervalType](target.end);
    return isWithinInterval(date, { start, end });
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
  const getIsWithInterval = isWithTargetInterval({
    start: fromUnixTimestamp(start),
    end: fromUnixTimestamp(end),
  });
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
      if (!getIsWithInterval(quarter, intervalsPeriod.QUARTER)) continue;

      let _quarterOutput = getInterval(quarter, intervalsPeriod.QUARTER);
      let months = eachMonthOfInterval({
        start: fromUnixTimestamp(_quarterOutput.start),
        end: fromUnixTimestamp(_quarterOutput.end),
      });
      let quarterChildren: any[] = [];

      for (let month of months) {
        if (!getIsWithInterval(month, intervalsPeriod.MONTH)) continue;
        let _monthOutput = getInterval(month, intervalsPeriod.MONTH);
        let weeks = eachWeekOfInterval({
          start: fromUnixTimestamp(_monthOutput.start),
          end: fromUnixTimestamp(_monthOutput.end),
        });
        let monthChildren: any[] = [];
        for (let i = 0; i < weeks.length; i++) {
          if (!getIsWithInterval(weeks[i], intervalsPeriod.WEEK)) continue;
          let _weekOutput = getInterval(weeks[i], intervalsPeriod.WEEK);
          // let days = eachDayOfInterval({
          //   start: fromUnixTimestamp(_weekOutput.start),
          //   end: fromUnixTimestamp(_weekOutput.end),
          // }).map((d) => [
          //   intervalNameFunction[intervalsPeriod.DAY](d),
          //   getInterval(d, intervalsPeriod.DAY),
          // ]);

          monthChildren = [
            ...monthChildren,
            [
              `W${i + 1}`,
              {
                ..._weekOutput,
                name: `W${i + 1}`,
                // children: Object.fromEntries(days),
              },
            ],
          ];
        }
        quarterChildren = [
          ...quarterChildren,
          [
            _monthOutput.name,

            {
              ..._monthOutput,
              start: monthChildren[0][1].start,
              end: monthChildren.at(-1)[1].end,
              children: Object.fromEntries(monthChildren),
            },
          ],
        ];
      }
      yearChildren = [
        ...yearChildren,
        [
          _quarterOutput.name,
          {
            ..._quarterOutput,
            start: quarterChildren[0][1].start,
            end: quarterChildren.at(-1)[1].end,
            children: Object.fromEntries(quarterChildren),
          },
        ],
      ];
    }

    output[_yearOutput.name] = {
      ..._yearOutput,
      start: yearChildren[0][1].start,
      end: yearChildren.at(-1)[1].end,
      children: Object.fromEntries(yearChildren),
    };
  }

  return output;
}

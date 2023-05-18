import { ascending, descending, rollup, sum } from 'd3';
import { MEDIA_SOURCES } from './mediaUtils';

function groupByColumn({
  input,
  keyColumn,
  valueColumn,
}: {
  input: any[];
  keyColumn: string;
  valueColumn: string;
}) {
  const outputMap = rollup(
    input,
    (v) => sum(v, (d) => d[valueColumn]),
    (d) => d[keyColumn],
  );
  const output = Array.from(outputMap).map(([name, value]) => ({
    name,
    value,
  }));
  return output;
}

export function getMediaAggregateIndicators(input: any) {
  let output: any[] = [];
  const { sources, summary } = input;
  output = [
    ...output,
    {
      name: MEDIA_SOURCES.MENCIONES_TOTALES,
      //@ts-ignore
      value: sum(sources, (d) => d.volume),
    },
  ];
  const sourceList = summary.sources;
  for (let sourceName of sourceList) {
    const currentSourceData = sources.filter(
      //@ts-ignore
      ({ source }) => source === sourceName,
    );
    //@ts-ignore
    const currentSourceCount = sum(currentSourceData, (d) => d.volume);
    if (currentSourceCount) {
      output = [...output, { name: sourceName, value: currentSourceCount }];
    }
  }
  //@ts-ignore
  return output.sort((a, b) => descending(a.value, b.value));
}

export function getMediaOrigins(input: any) {
  //@ts-ignore
  const { sources: _sources } = input;
  let _data2: any[] = [];
  const groupsArray = _sources.map(({ countries }: any) => countries);
  for (let group of groupsArray) {
    for (let [name, value] of group) {
      _data2 = [..._data2, { name, value }];
    }
  }

  const output = groupByColumn({
    input: _data2,
    valueColumn: 'value',
    keyColumn: 'name',
  })
    //@ts-ignore
    .sort((a, b) => descending(a.value, b.value))
    .slice(0, 10);
  //@ts-ignore
  return output.sort((a, b) => ascending(a.value, b.value));
}

export function getSentimentPercentages(input: any) {
  //@ts-ignore
  const { sources: _sources, summary } = input;
  let _data2: any[] = [];
  const sources = summary.sources;
  for (let sourceName of sources) {
    const sentimentBySource = _sources
      .filter(({ source }: any) => sourceName === source)
      .map(({ sentiment }: any) => sentiment);
    let groupSentiment: any[] = [];
    for (let group of sentimentBySource) {
      for (let [name, value] of group) {
        groupSentiment = [...groupSentiment, { name, value }];
      }
    }

    const sourceSentimentGroup = groupByColumn({
      input: groupSentiment,
      valueColumn: 'value',
      keyColumn: 'name',
    });

    const sentimanetTotal = sum(sourceSentimentGroup, ({ value }) => value);
    const {
      negative,
      positive,
      neutral,
      unknown: notRated,
    } = Object.fromEntries(
      sourceSentimentGroup.map(({ name, value }) => {
        return [name, value / sentimanetTotal];
      }),
    );

    if (negative || positive || neutral || notRated) {
      _data2 = [
        ..._data2,
        [sourceName, negative ?? 0, neutral ?? 0, positive ?? 0, notRated ?? 0],
      ];
    }
  }

  return _data2;
}

export function getSentimentHistory(input: any) {
  //     //@ts-ignore
  const { sources: _sources } = input;
  let _data2: any[] = [];
  let dates = Array.from(new Set(_sources.map(({ date }: any) => date)));
  for (let dateValue of dates) {
    const sentimentByDate = _sources
      .filter(({ date }: any) => date === dateValue)
      .map(({ sentiment }: any) => sentiment);
    let groupSentiment: any[] = [];
    for (let group of sentimentByDate) {
      for (let [name, value] of group) {
        groupSentiment = [...groupSentiment, { name, value }];
      }
    }
    const sourceSentimentGroup = groupByColumn({
      input: groupSentiment,
      valueColumn: 'value',
      keyColumn: 'name',
    });

    const {
      negative,
      positive,
      neutral,
      unknown: notRated,
    } = Object.fromEntries(
      sourceSentimentGroup.map(({ name, value }) => {
        return [name, value];
      }),
    );
    _data2 = [
      ..._data2,
      [dateValue, negative ?? 0, neutral ?? 0, positive ?? 0, notRated ?? 0],
    ];
  }

  return _data2.sort((a, b) => ascending(a[0], b[0]));
}

export function getTopPhrases(input: any) {
  //@ts-ignore
  const { sources: _sources } = input;
  let _data2: any[] = [];
  const groupsArray = _sources.map(({ topPhrases }: any) => topPhrases);
  for (let group of groupsArray) {
    for (let [name, value] of group) {
      _data2 = [..._data2, { name, value }];
    }
  }

  const output = groupByColumn({
    input: _data2,
    valueColumn: 'value',
    keyColumn: 'name',
  })
    //@ts-ignore
    .sort((a, b) => descending(a.value, b.value))
    .slice(0, 20);
  //@ts-ignore
  return output.sort((a, b) => ascending(a.value, b.value));
}

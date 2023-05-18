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
    { name: MEDIA_SOURCES.MENCIONES_TOTALES, value: summary.volume },
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
  const sources = Object.values(_sources);
  for (let source of sources) {
    //@ts-ignore
    const valueByDate = Object.values(source);
    if (valueByDate.length !== 0) {
      for (let { countries } of Object.values(valueByDate)) {
        //@ts-ignore
        for (let [key, { count }] of Object.entries(countries)) {
          _data2 = [..._data2, { name: key, value: count }];
        }
      }
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
  const { sources: _sources } = input;
  let _data2: any[] = [];
  const sources = Object.entries(_sources);
  for (let [sourceName, sourceValue] of sources) {
    //@ts-ignore
    const valueByDate = Object.values(sourceValue);
    let sourceSentiment: any[] = [];
    if (valueByDate.length !== 0) {
      for (let { sentiment } of Object.values(valueByDate)) {
        //@ts-ignore
        for (let [key, { count }] of Object.entries(sentiment)) {
          sourceSentiment = [...sourceSentiment, { name: key, value: count }];
        }
      }
      const sourceSentimentGroup = groupByColumn({
        input: sourceSentiment,
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
  const sources = Object.entries(_sources);
  for (let [sourceName, sourceValue] of sources) {
    //@ts-ignore
    const valueByDate = Object.entries(sourceValue);
    if (valueByDate.length !== 0) {
      for (let [date, { sentiment }] of Object.values(valueByDate)) {
        let sourceSentiment: any[] = [];
        //@ts-ignore
        for (let [key, { count }] of Object.entries(sentiment)) {
          sourceSentiment = [...sourceSentiment, { name: key, value: count }];
        }

        const sourceSentimentGroup = groupByColumn({
          input: sourceSentiment,
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
          [date, negative ?? 0, neutral ?? 0, positive ?? 0, notRated ?? 0],
        ];
      }
    }
  }

  return _data2.sort((a, b) => ascending(a[0], b[0]));
}

export function getTopPhrases(input: any) {
  //@ts-ignore
  const { sources: _sources } = input;
  let _data2: any[] = [];
  const sources = Object.values(_sources);
  for (let source of sources) {
    //@ts-ignore
    const valueByDate = Object.values(source);
    if (valueByDate.length !== 0) {
      for (let { topPhrases } of Object.values(valueByDate)) {
        //@ts-ignore
        for (let [key, { count }] of Object.entries(topPhrases)) {
          _data2 = [..._data2, { name: key, value: count }];
        }
      }
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

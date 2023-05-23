import { ascending, descending, flatRollup, maxIndex, minIndex, sum } from 'd3';
import { MEDIA_SOURCES, Input, Params, POST_URL_MAP } from './mediaUtils';
import groupByValue from 'utils/groupByValue';
import { Filters, filterValues } from 'utils/filterFunctions';

let mediaData: Partial<Input>;

export function setMediaData({ data }: Params) {
  mediaData = data;
  return true;
}

export function getMediaData(params: Params) {
  if (mediaData) {
    return mediaData;
  }
  return null;
}

function applyFiltersToData(
  data: Partial<Input>,
  filters: Filters,
): Partial<Input> {
  if (Object.keys(filters).length === 0) {
    return data;
  }

  const filteredData = filterValues(data.sources, filters);
  return { ...data, sources: filteredData };
}

export function getMediaAggregateIndicators({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    let output: any[] = [];
    const { sources, summary } = data;
    output = [
      ...output,
      {
        name: MEDIA_SOURCES.MENCIONES_TOTALES,

        value: sum(sources, (d) => d.volume),
      },
    ];
    const sourceList = summary.sources;
    for (let sourceName of sourceList) {
      const currentSourceData = sources.filter(
        ({ source }) => source === sourceName,
      );

      const currentSourceCount = sum(currentSourceData, (d) => d.volume);
      if (currentSourceCount) {
        output = [...output, { name: sourceName, value: currentSourceCount }];
      }
    }

    return output.sort((a, b) => descending(a.value, b.value));
  }

  return null;
}

export function getMediaOrigins({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    const { sources: _sources } = data;
    let _data2: any[] = [];
    const groupsArray = _sources.map(({ countries }: any) => countries);
    for (let group of groupsArray) {
      for (let [name, value] of group) {
        _data2 = [..._data2, { name, value }];
      }
    }

    const output = groupByValue({
      input: _data2,
      valueColumn: 'value',
      keyColumn: 'name',
    })
      .sort((a, b) => descending(a.value, b.value))
      .slice(0, 10);

    return output.sort((a, b) => ascending(a.value, b.value));
  }
  return null;
}

export function getSentimentPercentages({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    const { sources: _sources, summary } = data;
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

      const sourceSentimentGroup = groupByValue({
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
          [
            sourceName,
            negative ?? 0,
            neutral ?? 0,
            positive ?? 0,
            notRated ?? 0,
          ],
        ];
      }
    }

    return _data2;
  }
  return null;
}

export function getSentimentHistory({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    const { sources: _sources } = data;
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
      const sourceSentimentGroup = groupByValue({
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

  return null;
}

export function getHistoricalEngagementBySource({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    const { sources: _sources } = data;
    let output: any[] = [];
    const sourcesWithViews = Array.from(
      new Set(
        _sources.filter(({ views }) => views !== 0).map(({ source }) => source),
      ),
    );

    for (let source of sourcesWithViews) {
      const dataBySource = _sources.filter(
        ({ source: parentSource }) => parentSource === source,
      );
      const views = flatRollup(
        dataBySource,
        (v) => sum(v, (v) => v.views),
        (d) => d.date,
        (d) => d.source,
      ).sort((a, b) => ascending(a[0], b[0]));
      const volume = flatRollup(
        dataBySource,
        (v) => sum(v, (v) => v.volume),
        (d) => d.date,
        (d) => d.source,
      ).sort((a, b) => ascending(a[0], b[0]));
      output = [...output, [views, volume]];
    }

    return output;
  }
  return null;
}

export function getTopPhrases({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);

    const { sources: _sources } = data;

    let _data2: any[] = [];

    const groupsArray = _sources.map(({ topPhrases }: any) => topPhrases);

    for (let group of groupsArray) {
      for (let [name, value] of group) {
        _data2 = [..._data2, { name, value }];
      }
    }

    const output = groupByValue({
      input: _data2,
      valueColumn: 'value',
      keyColumn: 'name',
    })
      .sort((a, b) => descending(a.value, b.value))
      .slice(0, 20);

    return output.sort((a, b) => ascending(a.value, b.value));
  }

  return null;
}

export function getTopPosts({ filters }: Params) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);

    const { sources: _sources } = data;
    let _data2: any[] = [];

    const groupsArray = _sources
      .map(({ topPosts, source }) => ({ source, topPosts }))
      .filter(({ topPosts }) => topPosts.length !== 0);
    const sources = Array.from(
      new Set(groupsArray.map(({ source }) => source)),
    );

    let output: any[] = [];

    for (let source of sources) {
      const listBySource = groupsArray.filter(
        ({ source: parent }) => parent === source,
      );
      let _output: any = [];
      for (let { source, topPosts } of listBySource) {
        for (let [name, value] of topPosts) {
          const url = POST_URL_MAP.get(source)(name);
          _output = [..._output, { source, name, value, url }];
        }
      }
      //@ts-ignore
      const targetIndex = maxIndex(_output, (d) => d.value);
      output = [...output, { ..._output[targetIndex] }];
    }

    return output;
  }

  return null;
}

import { ascending, descending, flatRollup, maxIndex, sum } from 'd3';
import { MEDIA_SOURCES, Input, MediaParams, POST_URL_MAP } from './mediaUtils';
import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { Filters, filterValues } from 'utils/filterFunctions';
import crypto from 'crypto';

let mediaData: Partial<Input>;

export function setMediaData({ data }: MediaParams) {
  mediaData = data;
  return true;
}

export function getMediaData({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    return data;
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

export function getMediaAggregateIndicators({ filters }: MediaParams) {
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

export function getMediaOrigins({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    const { sources } = data;

    const output = groupByValue({
      input: sources,
      valueColumn: 'volume',
      keyColumn: 'country',
      type: GroupByTypes.SUM,
    })
      .sort((a, b) => descending(a.value, b.value))
      .slice(0, 10);

    return output.sort((a, b) => ascending(a.value, b.value));
  }
  return null;
}

export function getSentimentPercentages({ filters }: MediaParams) {
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
        type: GroupByTypes.SUM,
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

export function getSentimentHistory({ filters }: MediaParams) {
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
        type: GroupByTypes.SUM,
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

export function getHistoricalEngagementBySource({ filters }: MediaParams) {
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

export function getTopPhrases({ filters }: MediaParams) {
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
      type: GroupByTypes.SUM,
    })
      .sort((a, b) => descending(a.value, b.value))
      .slice(0, 20);

    return output.sort((a, b) => ascending(a.value, b.value));
  }

  return null;
}

export function getTopPosts({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);

    const { sources: _sources } = data;

    const groupsArray = _sources
      .map(({ topPosts, date, source }) => ({ source, date, topPosts }))
      .filter(({ topPosts }) => topPosts.length !== 0);
    const sources = Array.from(
      new Set(groupsArray.map(({ source }) => source)),
    );

    let output: any[] = [];

    for (let source of sources) {
      const listBySource = groupsArray.filter(
        ({ source: parent }) => parent === source,
      );
      let _output: any[] = [];
      for (let { source, date, topPosts } of listBySource) {
        for (let [name, value] of topPosts) {
          const url = POST_URL_MAP.get(source)(name);
          const id = crypto.randomBytes(20).toString('hex');
          _output = [..._output, { id, source, name, date, value, url }];
        }
      }
      //@ts-ignore
      const targetIndex = maxIndex(_output, (d) => d.value);
      output = [
        ...output,
        ..._output.sort((a, b) => descending(a.value, b.value)).slice(0, 10),
      ];
    }

    return output;
  }

  return null;
}

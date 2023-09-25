import { ascending, descending, flatRollup, max, min, sum } from 'd3';
import {
  MEDIA_SOURCES,
  Input,
  MediaParams,
  POST_URL_MAP,
  SourceField,
} from './mediaUtils';
import groupByValue, { GroupByTypes } from 'utils/groupByValue';
import { Filters, filterValues } from 'utils/filterFunctions';
import crypto from 'crypto';
import { getTemporalFilters } from 'utils/dateHelpers';
import { getUnixTimestamp } from 'utils/dateHelpers';

let mediaData: Input = [];

export function setMediaData({ data }: MediaParams) {
  for (let i = 0; i < data.length; i++) {
    const { keywords, topphrases, topposts, sentiment, ...rest }: any = data[i];
    const entry = {
      ...rest,
      keywords: JSON.parse(keywords),
      topPosts: JSON.parse(topposts),
      topPhrases: JSON.parse(topphrases),
      sentiment: JSON.parse(sentiment),
    };
    mediaData = [...mediaData, entry];
  }

  return true;
}

export function getMediaData({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    return data;
  }
  return null;
}

function applyFiltersToData(data: Input, filters: Filters): Input {
  if (Object.keys(filters).length === 0) {
    return data;
  }

  const filteredData = filterValues<SourceField>(data, filters);
  return filteredData;
}

export function getMediaAggregateIndicators({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);
    let output: any[] = [];
    output = [
      ...output,
      {
        name: MEDIA_SOURCES.MENCIONES_TOTALES,

        value: sum(data, (d) => d.volume),
      },
    ];
    const sourceList = Object.values(MEDIA_SOURCES);
    for (let sourceName of sourceList) {
      const currentSourceData = data.filter(
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

    const output = groupByValue({
      input: data,
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
    let _data2: any[] = [];
    const sources = Object.values(MEDIA_SOURCES);
    for (let sourceName of sources) {
      const sentimentBySource = data
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
    let _data2: any[] = [];
    let dates = Array.from(new Set(data.map(({ date }: any) => date)));
    for (let dateValue of dates) {
      const sentimentByDate = data
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
    let output: any[] = [];
    const sourcesWithViews = Array.from(
      new Set(
        data.filter(({ views }) => views !== 0).map(({ source }) => source),
      ),
    );

    for (let source of sourcesWithViews) {
      const dataBySource = data.filter(
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

    let _data2: any[] = [];

    const groupsArray = data.map(({ topPhrases }: any) => topPhrases);

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
      .slice(0, 30);

    return output.sort((a, b) => ascending(a.value, b.value));
  }

  return null;
}

export function getTopPosts({ filters }: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, filters);

    const groupsArray = data
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
        if (source === 'news') continue;
        for (let [name, value] of topPosts) {
          const url = POST_URL_MAP.get(source)(name) || name;
          const id = crypto.randomBytes(20).toString('hex');
          _output = [..._output, { id, source, name, date, value, url }];
        }
      }

      output = [
        ...output,
        ..._output.sort((a, b) => descending(a.value, b.value)).slice(0, 10),
      ];
    }

    return output;
  }

  return null;
}

export function getTemporalFilterValues({ filters }: MediaParams) {
  if (mediaData) {
    const sourceWithUnixTime = mediaData.map((d) => ({
      ...d,
      date: getUnixTimestamp(new Date(d.date)),
    }));
    const column = 'date';
    return getTemporalFilters(sourceWithUnixTime, column);
  }
  return null;
}

export function getDateRange(_e: MediaParams) {
  if (!mediaData) return null;
  const maxDate = max(mediaData, (d) => d.date);
  const minDate = min(mediaData, (d) => d.date);
  return [minDate, maxDate];
}

export function getKeywords(_e: MediaParams) {
  if (mediaData) {
    const data = applyFiltersToData(mediaData, _e.filters);

    let _data2: any[] = [];

    const groupsArray = data.map(({ keywords }) => keywords);

    for (let group of groupsArray) {
      _data2 = [
        ..._data2,
        ...group.map(([name, value]) => ({
          name: name.toLocaleLowerCase(),
          value,
        })),
      ];
    }

    const output = groupByValue({
      input: _data2,
      valueColumn: 'value',
      keyColumn: 'name',
      type: GroupByTypes.SUM,
    }).sort((a, b) => descending(a.value, b.value));

    return output.sort((a, b) => ascending(a.value, b.value));
  }

  return null;
}

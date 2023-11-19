import DinamicaStrictDateFilter from './DinamicaStrictDateFilter';
import CountryFilter from 'components/filters/CountryFilter';
import { SOURCE_NAMES } from 'data/sources/sourceTypes';

export default function DinamicaFilters() {
  return (
    <>
      <DinamicaStrictDateFilter />
      <CountryFilter dataSource={SOURCE_NAMES.TIMELINE_SOURCE} />
    </>
  );
}

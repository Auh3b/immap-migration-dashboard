import { FilterTypes } from '@carto/react-core/src/filters/FilterTypes';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import useIntroCategoryChange from 'components/indicators/introduction/hooks/useCategoryChange';
import useIntroData from 'components/indicators/introduction/hooks/useIntroData';
import getSourceFilter from 'components/indicators/media/utils/getSourceFilter';
import { ChangeEvent, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const column = 'country_name';
// const global = true;
const type = FilterTypes.IN;

interface CountryFilterProps {
  source: string;
  title: string;
  id: string;
}

export default function CountryFilterIntro(props: CountryFilterProps) {
  const { source, title, id } = props;
  //@ts-ignore
  const _filters = useSelector((state) => state.intro.filters) || {};
  const selectedValues = useMemo(
    () => getSourceFilter(id, _filters, source),
    [_filters],
  );

  const { data } = useIntroData({
    id,
    methodName,
    column,
    source,
  });
  const handleSelect = useIntroCategoryChange({
    source,
    owner: id,
    type,
    column,
  });

  const handleChange = useCallback(
    (e: ChangeEvent<{ value: unknown }>) => {
      handleSelect(e.target.value);
    },
    [handleSelect],
  );

  return (
    <Grid item style={{ margin: '8px 0' }}>
      <FormControl variant={'outlined'}>
        <InputLabel id='countrySelect'>{title}</InputLabel>
        <Select
          labelId='countrySelect'
          id='countrySelect'
          multiple
          value={selectedValues}
          label={title}
          onChange={handleChange}
        >
          {data.length &&
            data
              .filter(({ name }) => name != 'z')
              .map((d: { name: string; value: number }, i) => (
                <MenuItem key={d?.name || i} value={d?.name || i}>
                  {d.name || 'Unknown Region'}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

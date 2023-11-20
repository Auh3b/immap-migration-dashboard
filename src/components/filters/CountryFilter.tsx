import { FilterTypes } from '@carto/react-core/src/filters/FilterTypes';
import { addFilter, removeFilter } from '@carto/react-redux';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import useWidgetFetch from 'components/common/customWidgets/hooks/useWidgetFetch';
import useWidgetFilterValues from 'components/common/customWidgets/hooks/useWidgetFilterValues';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const id = 'countryFilter';
const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const column = 'country_name';
// const global = true;
const type = FilterTypes.IN;

interface CountryFilterProps {
  dataSource: string;
  title: string;
}

export default function CountryFilter(props: CountryFilterProps) {
  const { dataSource, title } = props;
  const selectedValues =
    useWidgetFilterValues({ dataSource, id, column, type }) || [];
  const dispatch = useDispatch();
  const { data } = useWidgetFetch({
    id,
    methodName,
    column,
    dataSource,
  });
  const handleSelect = (e: ChangeEvent<{ value: string[] }>) => {
    const values = e.target.value;
    if (values.length) {
      dispatch(
        addFilter({
          id: dataSource,
          owner: id,
          type,
          column,
          values: e.target.value,
        }),
      );
    } else {
      dispatch(
        removeFilter({
          owner: id,
          id: dataSource,
          column,
        }),
      );
    }
  };

  return (
    <Grid item style={{ margin: '8px' }}>
      <FormControl variant={'outlined'}>
        <InputLabel id='countrySelect'>{title}</InputLabel>
        <Select
          labelId='countrySelect'
          id='countrySelect'
          multiple
          value={selectedValues}
          label={title}
          onChange={handleSelect}
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

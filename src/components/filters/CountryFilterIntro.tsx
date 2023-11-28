import { FilterTypes } from '@carto/react-core/src/filters/FilterTypes';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIntroFilter, removeIntroFilter } from 'store/introSlice';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';

const methodName = EXTERNAL_METHOD_NAMES.GROUP_CATEGORIES;
const column = 'country_name';
// const global = true;
const type = FilterTypes.IN;

interface CountryFilterProps {
  sources: string[];
  title: string;
  id: string;
}
const data = ['Colombia', 'Chile', 'Costa Rica', 'Panama'];
export default function CountryFilterIntro(props: CountryFilterProps) {
  const { sources, title, id } = props;
  const [selectedValues, setSelectedValues] = useState([]);
  const dispatch = useDispatch();

  const handleSelects = useCallback(
    (values: string[]) => {
      if (!values.length) {
        sources.forEach((source) => {
          dispatch(
            removeIntroFilter({ column, source, owner: id + '_' + source }),
          );
        });
        setSelectedValues([]);
        return;
      }
      sources.forEach((source) => {
        dispatch(
          addIntroFilter({
            column,
            source,
            owner: id + '_' + source,
            values,
            type,
          }),
        );
      });
      setSelectedValues(values);
    },
    [sources],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<{ value: string[] }>) => {
      handleSelects(e.target.value);
    },
    [handleSelects],
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
          {data.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
}

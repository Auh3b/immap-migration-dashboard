import {
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import useWidgetFetch from '../customWidgets/hooks/useWidgetFetch';
import { EXTERNAL_METHOD_NAMES } from 'utils/methods/methods';
import { ChangeEvent, useState } from 'react';

const id = 'push';
const column = 'servi_tipo1';
const dataSource = '';
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const pushes = [1, 2, 3, 4, 5, 6, 7, 8];

export default function PushFilter() {
  const [selected, setSelected] = useState([]);
  const handleSelect = (event: ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target as HTMLSelectElement;
    // @ts-ignore
    setSelected(value);
  };
  return (
    <FormControl>
      <InputLabel>Select Push</InputLabel>
      <Select
        name='push-select'
        onChange={handleSelect}
        multiple
        value={selected}
        input={<Input />}
      >
        {pushes.map((d) => (
          <MenuItem key={'push_' + d} value={d}>
            {d === 1 ? 'Enchanche' : 'Push ' + (d - 1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

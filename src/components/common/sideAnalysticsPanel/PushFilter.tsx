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
import { useSelector } from 'react-redux';

const id = 'push';
const column = 'servi_tipo1';
const dataSource = '';
const methodName = EXTERNAL_METHOD_NAMES.CONCATENATED_VALUES;
const pushes = [0, 1, 2, 3, 4, 5, 6, 7];
const getPushes = (phase: number) => {
  const extent = phase === 2 ? 13 : 8;
  const pushList = Array(extent)
    .fill(0)
    .map((d, i) => i);

  return pushList;
};

export default function PushFilter() {
  const [selected, setSelected] = useState([]);
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase) || 1;
  const pushes = getPushes(phase);
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
            {d ? 'Push ' + d : 'Enchanche'}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

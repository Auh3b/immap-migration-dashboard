import { withStyles } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ascending } from 'd3';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FilterTypes } from 'utils/filterFunctions';
import { Values } from './strictDateFilterTypes';
import { grey } from '@material-ui/core/colors';

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
  },
  grouped: {
    margin: theme.spacing(0.5),
    border: '0.5px solid ' + grey[200],
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
      borderLeft: '0.5px solid ' + grey[200],
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    width: '100%',
  },
  selected: {
    backgroundColor: theme.palette.background.paper + ' !important',
    boxShadow: theme.shadows[3],
    '& > span': {
      color: theme.palette.primary.main + ' !important',
      fontWeight: 'bold',
    },
  },
  label: {
    ...theme.typography.overline,
    fontSize: theme.typography.pxToRem(theme.spacing(1.5)),
  },
}))(ToggleButton);

type Size = 'small' | 'medium' | 'large';

interface CustomTapProps {
  id: string;
  column: string;
  source: string;
  type: FilterTypes;
  values: Record<string, Values>;
  selected: any;
  onSelectionChange: (event: MouseEvent<HTMLElement>, newValue: any) => void;
  exclusive?: boolean;
  size?: Size;
  addFilter: Function;
  removeFilter: Function;
}

export default function CustomTab({
  id,
  column,
  source,
  type,
  values,
  selected,
  size = 'medium',
  onSelectionChange,
  exclusive = true,
  addFilter,
  removeFilter,
}: CustomTapProps) {
  const dispatch = useDispatch();
  const [selectedChild, setSelectedChild] = useState(null);
  const selectedChildren = useMemo(
    () => (selected ? values[selected].children : null),
    [selected],
  );

  useEffect(() => {
    setSelectedChild(null);
  }, [selected]);

  const handleSelectionChange = useCallback(
    (newValue: string) => {
      if (newValue) {
        const _values = [
          selectedChildren[newValue].start,
          selectedChildren[newValue].end,
        ];
        dispatch(
          addFilter({
            id: source,
            owner: id,
            column,
            source,
            type,
            values: [_values],
          }),
        );
      } else {
        const _values = [values[selected].start, values[selected].end];
        dispatch(
          addFilter({
            id: source,
            owner: id,
            column,
            source,
            type,
            values: [_values],
          }),
        );
      }
    },
    [selected, values, source, id, column, selectedChild, selectedChildren],
  );

  const handleChildSelection = (
    event: MouseEvent<HTMLElement>,
    newValue: any,
  ) => {
    setSelectedChild(newValue);
    handleSelectionChange(newValue);
  };

  return (
    <>
      {/* @ts-ignore */}
      <StyledToggleButtonGroup
        value={selected}
        onChange={onSelectionChange}
        exclusive={exclusive}
        size={size}
      >
        {Object.values(values)
          .sort((a, b) => ascending(a.start, b.start))
          .map(({ name }) => {
            return (
              // @ts-expect-error
              <StyledToggleButton key={name} value={name}>
                {name}
              </StyledToggleButton>
            );
          })}
      </StyledToggleButtonGroup>
      {selectedChildren && (
        <CustomTab
          id={id}
          column={column}
          source={source}
          type={type}
          addFilter={addFilter}
          removeFilter={removeFilter}
          size={Object.keys(selectedChildren).length > 5 ? 'small' : 'medium'}
          values={selectedChildren}
          selected={selectedChild}
          onSelectionChange={handleChildSelection}
        />
      )}
    </>
  );
}

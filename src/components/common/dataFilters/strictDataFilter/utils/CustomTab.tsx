import { withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { ascending } from 'd3';
import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addIntroFilter } from 'store/introSlice';
import { FilterTypes } from 'utils/filterFunctions';

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: grey[50],
  },
  grouped: {
    margin: theme.spacing(1),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    width: '100%',
    flexWrap: 'wrap',
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

interface Values {
  name: string;
  start: number;
  end: number;
  intervalValue: number;
  children?: Record<string, Values>;
}

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
          addIntroFilter({
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
          addIntroFilter({
            owner: id,
            column,
            source,
            type,
            values: [_values],
          }),
        );
      }
    },
    [selected, values, selectedChild, selectedChildren],
  );

  const handleChildSelection = (
    event: MouseEvent<HTMLElement>,
    newValue: any,
  ) => {
    setSelectedChild(newValue);
    handleSelectionChange(newValue);
  };

  // console.log(values)

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
          size={Object.keys(selectedChildren).length > 5 ? 'small' : 'medium'}
          values={selectedChildren}
          selected={selectedChild}
          onSelectionChange={handleChildSelection}
        />
      )}
    </>
  );
}

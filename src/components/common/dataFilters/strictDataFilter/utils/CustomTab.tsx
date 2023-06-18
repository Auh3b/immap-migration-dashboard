import { Typography, withStyles } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { MouseEvent, useEffect, useState } from 'react';

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
      marginRight: theme.spacing(1),
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
    '& > span > span': {
      color: theme.palette.primary.main + ' !important',
      fontWeight: 'bold',
    },
  },
}))(ToggleButton);

interface CustomTapProps {
  values: any[];
  selected: any;
  onSelectionChange: (event: MouseEvent<HTMLElement>, newValue: any) => void;
  exclusive?: boolean;
  children?: any[];
}

export default function CustomTab({
  values,
  selected,
  onSelectionChange,
  children,
  exclusive = true,
}: CustomTapProps) {
  const [selectedChild, setSelectedChild] = useState(null);
  const handleChildSelection = (
    event: MouseEvent<HTMLElement>,
    newValue: any,
  ) => {
    setSelectedChild(newValue);
  };
  const hideNested = Boolean(selected);
  return (
    <>
      {/* @ts-ignore */}
      <StyledToggleButtonGroup
        value={selected}
        onChange={onSelectionChange}
        exclusive={exclusive}
      >
        {values.map((v) => (
          // @ts-expect-error
          <StyledToggleButton key={v} value={v}>
            <Typography variant='overline'>{v}</Typography>
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
      {children && !hideNested && (
        <CustomTab
          values={children.map((d) => d.name)}
          selected={selectedChild}
          onSelectionChange={handleChildSelection}
        />
      )}
    </>
  );
}

import { Button, Grid, Menu, MenuItem, MenuList } from '@material-ui/core';
import {
  Dispatch,
  Fragment,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPhase } from 'store/appSlice';

interface PhaseIndicatorProps {
  isPanelOpen?: boolean;
  fullText?: boolean;
}

export default function PhaseIndicator(props: PhaseIndicatorProps) {
  const dispatch = useDispatch();
  // @ts-ignore
  const phase = useSelector((state) => state.app.phase);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  useEffect(() => {
    if (!phase) {
      dispatch(setPhase(1));
    }
  }, [phase]);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };
  return (
    <Grid style={{ padding: '8px', width: '100%' }}>
      <Button
        color={'primary'}
        disabled={props.isPanelOpen}
        fullWidth
        style={{ minWidth: 'unset' }}
        onClick={handleClick}
        variant={'contained'}
      >
        {props.fullText ? 'Phase ' + phase : phase}
      </Button>
      <PhaseIndicatorSelector anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </Grid>
  );
}

interface PhaseIndicatorSelectorProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<
    SetStateAction<PhaseIndicatorSelectorProps['anchorEl']>
  >;
}

function PhaseIndicatorSelector(props: PhaseIndicatorSelectorProps) {
  const dispatch = useDispatch();
  const onClose = () => props.setAnchorEl(null);

  const handleClick = (phaseIndex: number) => () => {
    dispatch(setPhase(phaseIndex));
    onClose();
  };
  return (
    <Menu
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={onClose}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuList>
        {[1, 2].map((d) => (
          <MenuItem key={'phase_' + d} dense onClick={handleClick(d)}>
            Ronda {d}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

import { Button, Grid, Menu, MenuItem } from '@material-ui/core';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearMediaFilters, getViewMode, setViewMode } from 'store/mediaSlice';

export default function MediaViewMode() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch();
  // @ts-ignore
  const mode = useSelector((state) => getViewMode(state.media));

  const handleModeChange = (newMode: number) => {
    return () => {
      dispatch(clearMediaFilters());
      dispatch(setViewMode(newMode));
      handleClose();
    };
  };

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid item>
      <Button onClick={handleOpen}>
        {mode ? 'Vista comparativa' : 'Vista única'}
      </Button>
      <Menu
        id='view-mode-menu'
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleModeChange(0)}>Vista única</MenuItem>
        <MenuItem onClick={handleModeChange(1)}>Vista comparativa</MenuItem>
      </Menu>
    </Grid>
  );
}

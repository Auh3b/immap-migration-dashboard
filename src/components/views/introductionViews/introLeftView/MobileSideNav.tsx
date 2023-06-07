import { ClickAwayListener, Fab, Fade, Popper } from '@material-ui/core';
import { MouseEvent, useState } from 'react';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export default function MobileSideNav({ classes, children }: any) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopup = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl((anchor) => (anchor ? null : e.currentTarget));
  };
  const onClickAway = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ClickAwayListener onClickAway={onClickAway}>
        <Fab className={classes.fab} onClick={handlePopup}>
          <HelpOutlineIcon />
        </Fab>
      </ClickAwayListener>
      <Popper
        anchorEl={anchorEl}
        open={open}
        placement='top-end'
        className={classes.popper}
      >
        {({ TransitionProps }) => <Fade {...TransitionProps}>{children}</Fade>}
      </Popper>
    </>
  );
}

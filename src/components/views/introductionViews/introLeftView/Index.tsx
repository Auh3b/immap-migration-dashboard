import DesktopSideNav from './DesktopSideNav';
import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useState } from 'react';
import { CustomTheme, UNICEF_COLORS } from 'theme';
import IntroContent from './IntroContent';
import MobileSideNav from './MobileSideNav';

const drawerWidth = 300;

export const useLeftStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    BorderRight: `1px solid ${UNICEF_COLORS[0]}`,
    flexWrap: 'nowrap',
    [theme.breakpoints.down('lg')]: {
      paddingTop: theme.spacing(1),
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
    },
  },
  toggleButton: {
    padding: theme.spacing(0.5),
    boxShadow: theme.shadows[1],
    backgroundColor: ({ isOpen }: any) =>
      isOpen ? UNICEF_COLORS[0] : theme.palette.grey[100],
    color: ({ isOpen }: any) =>
      isOpen ? theme.palette.background.paper : 'inherit',
    '&:hover': {
      color: ({ isOpen }: any) =>
        isOpen ? theme.palette.background.paper : 'inherit',
      backgroundColor: ({ isOpen }: any) =>
        isOpen ? UNICEF_COLORS[0] : 'inherit',
      boxShadow: theme.shadows[10],
    },
  },
  button: {
    width: '100%',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'fixed',
    zIndex: theme.zIndex.modal + 1,
    bottom: theme.spacing(1),
    left: theme.spacing(1),
  },
  collapse: {
    maxHeight: '70vh',
    overflowY: 'auto',
  },
  popper: {
    zIndex: ({ isMobile }: any) => (isMobile ? theme.zIndex.modal + 1 : 0),
  },
}));
export default function IntroLeftView() {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const handleOpenToggle = (value: Boolean) => {
    setIsOpen(value);
  };
  const isMobile = useMediaQuery((theme: CustomTheme) =>
    theme.breakpoints.down('xs'),
  );
  const classes = useLeftStyles({ isOpen, isMobile });
  return (
    <>
      {!isMobile && (
        <DesktopSideNav
          classes={classes}
          isOpen={isOpen}
          handleOpenToggle={handleOpenToggle}
        >
          <IntroContent classes={classes} />
        </DesktopSideNav>
      )}
      {isMobile && (
        <MobileSideNav
          classes={classes}
          isOpen={isOpen}
          handleOpenToggle={handleOpenToggle}
        >
          <IntroContent classes={classes} />
        </MobileSideNav>
      )}
    </>
  );
}

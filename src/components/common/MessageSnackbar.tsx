import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'store/appSlice';

export default function MessageSnackbar() {
  const dispatch = useDispatch();
  // @ts-ignore
  const message = useSelector((state) => state.app.message);
  const handleClose = () => dispatch(setMessage(null));
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(message)}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert
        severity={message?.severity}
        action={
          <Fragment>
            <IconButton size={'small'} onClick={handleClose}>
              <Close fontSize={'small'} />
            </IconButton>
          </Fragment>
        }
      >
        <span dangerouslySetInnerHTML={{ __html: message?.text }} />
      </Alert>
    </Snackbar>
  );
}

import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from 'store/appSlice';

export default function MessageSnackbar() {
  const dispatch = useDispatch();
  // @ts-ignore
  const message = useSelector((state) => state.app.message);
  console.log(message);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(message)}
      autoHideDuration={5000}
      onClose={() => dispatch(setMessage(null))}
    >
      <Alert severity={message?.severity}>{message?.text}</Alert>
    </Snackbar>
  );
}

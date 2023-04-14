import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@carto/react-redux';

export default function useAuth() {
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        let accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNHY4Zm5mc2giLCJqdGkiOiIzMmE5N2IxMyJ9.d2qwdn9-ckiWYsmNUyJ5-4Ui1WhNjbjG0mLJJMNLMQ0';
        dispatch(setCredentials({ accessToken }));
      };
      getAccessToken();
    }
  }, [isAuthenticated, dispatch]);

  return;
}

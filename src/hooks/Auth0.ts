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
        let accessToken = process.env.REACT_APP_CARTO_ACCESS_TOKEN
        dispatch(setCredentials({ accessToken }));
      };
      getAccessToken();
    }
  }, [isAuthenticated, dispatch]);

  return;
}

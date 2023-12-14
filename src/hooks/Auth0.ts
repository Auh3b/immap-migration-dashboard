import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { setCredentials } from '@carto/react-redux';
import { setUser } from 'store/appSlice';

export default function useAuth() {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      const getAccessToken = async () => {
        let accessToken = process.env.REACT_APP_CARTO_ACCESS_TOKEN;
        dispatch(setCredentials({ accessToken }));
        dispatch(setUser(user));
      };
      getAccessToken();
    }
  }, [isAuthenticated, dispatch]);

  return;
}

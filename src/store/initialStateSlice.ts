import { POSITRON } from '@carto/react-basemaps';
import { InitialCarto3State } from '@carto/react-redux';
// @ts-ignore
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState: InitialCarto3State = {
  viewState: {
    latitude: 8.62581290990417,
    longitude: -81.39079408436801,
    zoom: 6,
    //@ts-ignore
    // minZoom: 5,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: POSITRON,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
    // accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhIjoiYWNfNHY4Zm5mc2giLCJqdGkiOiIzMmE5N2IxMyJ9.d2qwdn9-ckiWYsmNUyJ5-4Ui1WhNjbjG0mLJJMNLMQ0'
  },
  googleApiKey: '', // only required when using a Google Basemap,
  googleMapId: '', // only required when using a Google Custom Basemap
  oauth: {
    domain: 'dev-k52rcymcfpbru0c6.us.auth0.com',
    clientId: 'LMphNEIciySqmskZ1Cx7l7DvqLrHRJgz', // type here your application clientId
    organizationId: '', // organizationId is required for SSO
    scopes: [
      'read:current_user',
      'update:current_user',
      'read:connections',
      'write:connections',
      'read:maps',
      'write:maps',
      'read:account',
      'admin:account',
    ],
    audience: 'carto-cloud-native-api',
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
};

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
    maxZoom: 13,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: POSITRON,
  credentials: {
    apiVersion: API_VERSIONS.V3,
    apiBaseUrl: 'https://gcp-us-east1.api.carto.com',
  },
  googleApiKey: '', // only required when using a Google Basemap,
  googleMapId: '', // only required when using a Google Custom Basemap
  oauth: {
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID, // type here your application clientId
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

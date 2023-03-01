import { Outlet } from 'react-router-dom';
import MapContainer from './MapContainer';
export default function OutletView() {
  return (
    //@ts-ignore
    <Outlet />
  );
}

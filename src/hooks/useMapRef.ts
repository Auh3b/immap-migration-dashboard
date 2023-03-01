import { useState } from 'react';

export default function useMapRef() {
  const [mapRef, setMapRef] = useState(null);
  return { mapRef, setMapRef };
}

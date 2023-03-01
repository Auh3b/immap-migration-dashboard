import { useContext } from "react";
import mapContext from "./mapContext";

export default function useMapContext() {
  //@ts-ignore
  const {mapRef, setMapRef} =  useContext(mapContext)
  return {mapRef, setMapRef}
}

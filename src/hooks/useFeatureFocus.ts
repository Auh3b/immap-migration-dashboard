import { useDispatch } from "react-redux";
import useCustomCompareEffect from "./useCustomCompareEffect";
import { dequal } from "dequal";

export default function useFeatureFocus() {
  const dispatch = useDispatch()
  useCustomCompareEffect(()=>{}, [dispatch], dequal)
}

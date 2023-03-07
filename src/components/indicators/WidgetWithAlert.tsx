//@ts-nocheck
import { checkIfSourceIsDroppingFeature } from '@carto/react-redux';
import { NoDataAlert } from '@carto/react-ui/';
import { useSelector } from 'react-redux';

const defaultDroppingFeaturesAlertProps = {
  body: 'Data for this widget is not available at this zoom level. Zoom in to get data from features in the map.',
};

export default function WidgetWithAlert({
  dataSource,
  droppingFeaturesAlertProps = defaultDroppingFeaturesAlertProps,
  showDroppingFeaturesAlert = true,
  noDataAlertProps = {},
  global = false,
  warning = '',
  children,
}) {
  const isDroppingFeatures = useSelector((state) =>
    checkIfSourceIsDroppingFeature(state, dataSource),
  );

  return (!global && isDroppingFeatures && showDroppingFeaturesAlert) ||
    warning ||
    !children ? (
    <NoDataAlert
      {...(isDroppingFeatures
        ? droppingFeaturesAlertProps
        : warning
        ? { ...noDataAlertProps, body: warning }
        : noDataAlertProps)}
    />
  ) : (
    children
  );
}

import { Platform } from 'react-native';
import { colors } from '@hedviginsurance/brand';

export const RESTART_BUTTON = {
  id: 'RESTART_BUTTON',
  icon: Platform.select({
    ios: require('../../../../assets/icons/navigation/topBar/ios/restart.png'),
    android: require('../../../../assets/icons/navigation/topBar/android/restart.png'),
  }),
  color: colors.DARK_GRAY,
};

export const GO_TO_DASHBOARD_BUTTON = {
  id: 'GO_TO_DASHBOARD',
  icon: Platform.select({
    ios: require('../../../../assets/icons/navigation/topBar/ios/to_dashboard.png'),
    android: require('../../../../assets/icons/navigation/topBar/android/to_dashboard.png'),
  }),
  color: colors.DARK_GRAY,
};

export const CLOSE_BUTTON = {
  id: 'CLOSE_BUTTON',
  icon: Platform.select({
    ios: require('../../../../assets/icons/navigation/topBar/ios/close.png'),
    android: require('../../../../assets/icons/navigation/topBar/android/close.png'),
  }),
  color: colors.DARK_GRAY,
};

export const SHOW_OFFER_BUTTON = {
  id: 'SHOW_OFFER_BUTTON',
  text: 'Fortsätt →',
  color: colors.PURPLE,
};

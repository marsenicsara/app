import { Platform } from 'react-native';
import { colors } from '@hedviginsurance/brand';

export const CLOSE_BUTTON = (color: string = colors.DARK_GRAY) => ({
  id: 'CLOSE_BUTTON',
  icon: Platform.select({
    ios: require('assets/icons/navigation/topBar/ios/close.png'),
    android: require('assets/icons/navigation/topBar/android/close.png'),
  }),
  color,
});

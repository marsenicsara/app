import { Platform } from 'react-native';
import { MARKETING_SCREEN } from '../screens/marketing';

export const getMarketingLayout = () =>
  Platform.select({
    ios: {
      root: {
        externalComponent: {
          name: 'marketingScreen',
        },
      },
    },
    android: {
      root: {
        stack: {
          children: [MARKETING_SCREEN],
        },
      },
    },
  });

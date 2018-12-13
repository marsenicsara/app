import { Platform } from 'react-native';
import { MARKETING_SCREEN } from '../screens/marketing';
import { Navigation } from 'react-native-navigation';
import { registerExternalComponentId } from './../native-routing';

export const getMarketingLayout = () =>
  Platform.select({
    ios: () => {
      Navigation.events().registerComponentDidAppearListener(
        ({ componentId, componentName }) => {
          registerExternalComponentId(componentId, componentName);
        },
      );

      return {
        root: {
          stack: {
            children: [
              {
                externalComponent: {
                  name: 'marketingScreen',
                },
              },
            ],
            options: {
              topBar: {
                visible: false,
              },
            },
          },
        },
      };
    },
    android: () => ({
      root: {
        stack: {
          children: [MARKETING_SCREEN],
        },
      },
    }),
  })();

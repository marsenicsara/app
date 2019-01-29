import { Platform } from 'react-native';

import { DASHBOARD_SCREEN } from '../screens/dashboard';
import { PROFILE_SCREEN } from '../screens/profile';
import { FAB_COMPONENT } from '../components/fab';

export const getMainLayout = () =>
  Platform.OS === 'ios'
    ? {
        root: {
          externalComponent: {
            name: 'loggedInScreen',
          },
        },
        overlays: [
          {
            component: {
              name: FAB_COMPONENT.name,
              options: {
                layout: {
                  backgroundColor: 'transparent',
                },
                overlay: {
                  interceptTouchOutside: false,
                },
                statusBar: {
                  style: 'dark',
                },
              },
            },
          },
        ],
      }
    : {
        root: {
          bottomTabs: {
            children: [
              {
                stack: {
                  children: [DASHBOARD_SCREEN],
                  options: {
                    bottomTab: {
                      text: 'Hemförsäkring',
                      icon: require('../../../assets/icons/tab_bar/lagenhet.png'),
                    },
                  },
                },
              },
              {
                stack: {
                  children: [PROFILE_SCREEN],
                  options: {
                    bottomTab: {
                      text: 'Profil',
                      icon: require('../../../assets/icons/tab_bar/du_och_din_familj.png'),
                    },
                  },
                },
              },
            ],
          },
        },
      };

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
      overlays: [],
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
              externalComponent: {
                name: 'profileScreen',
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

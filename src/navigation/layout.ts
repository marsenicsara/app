import { AsyncStorage, Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import gql from 'graphql-tag';

import {
  SEEN_MARKETING_CAROUSEL_KEY,
  IS_VIEWING_OFFER,
  LAUNCH_DEBUG,
} from '../constants';
import { client } from 'src/graphql/client';
import { InsuranceStatus } from 'src/graphql/components';

import { colors, fonts } from '@hedviginsurance/brand';

import { CHAT_SCREEN } from './screens/chat';
import { MARKETING_SCREEN } from './screens/marketing';
import { DASHBOARD_SCREEN } from './screens/dashboard';
import { PROFILE_SCREEN } from './screens/profile';
import { FAB_COMPONENT } from './components/fab';
import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { OFFER_SCREEN } from 'src/navigation/screens/offer';
import { DEBUG_SCREEN } from 'src/navigation/screens/debug';

import {
  getOfferGroup,
  OFFER_GROUPS,
} from 'src/navigation/screens/offer/ab-test';

export const getMarketingLayout = () => ({
  root: {
    stack: {
      children: [MARKETING_SCREEN],
    },
  },
});

export const getMainLayout = () => ({
  root: {
    bottomTabs: {
      children: [
        {
          stack: {
            children: [DASHBOARD_SCREEN],
            options: {
              bottomTab: {
                text: 'Hemförsäkring',
                icon: require('../../assets/icons/tab_bar/lagenhet.png'),
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
                icon: require('../../assets/icons/tab_bar/du_och_din_familj.png'),
              },
            },
          },
        },
      ],
    },
  },
  overlays:
    Platform.OS === 'ios'
      ? [
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
              },
            },
          },
        ]
      : [],
});

export const getChatLayout = () => ({
  root: {
    stack: {
      children: [CHAT_SCREEN],
    },
  },
});

export const getNewOfferLayout = () => ({
  root: {
    stack: {
      children: [NEW_OFFER_SCREEN],
    },
  },
});

export const getOldOfferLayout = () => ({
  modals: [
    {
      stack: {
        children: [OFFER_SCREEN],
      },
    },
  ],
  ...getChatLayout(),
});

export const getOfferLayout: () => Promise<any> = async () => {
  if ((await getOfferGroup()) === OFFER_GROUPS.NEW) {
    return getNewOfferLayout();
  }

  return getOfferLayout();
};

export const getDebugLayout = () => ({
  root: {
    stack: {
      children: [DEBUG_SCREEN],
    },
  },
});

export const shouldShowDashboard = (insuranceStatus: string) =>
  ['ACTIVE', 'INACTIVE_WITH_START_DATE', 'INACTIVE'].indexOf(
    insuranceStatus,
  ) !== -1;

export const getInitialLayout = async () => {
  if (await AsyncStorage.getItem(LAUNCH_DEBUG)) {
    return getDebugLayout();
  }

  const alreadySeenMarketingCarousel = await AsyncStorage.getItem(
    SEEN_MARKETING_CAROUSEL_KEY,
  );

  if (!alreadySeenMarketingCarousel) {
    return getMarketingLayout();
  }

  const { data } = await client.query<{
    insurance: { status: InsuranceStatus };
  }>({
    query: gql`
      query InsuranceStatus {
        insurance {
          status
        }
      }
    `,
  });

  if (shouldShowDashboard(data.insurance.status)) {
    return getMainLayout();
  }

  const isViewingOffer = await AsyncStorage.getItem(IS_VIEWING_OFFER);

  if (isViewingOffer) {
    const OFFER_LAYOUT = await getOfferLayout();
    return OFFER_LAYOUT;
  }

  return getChatLayout();
};

export const setLayout = ({
  root,
  modals = [],
  overlays = [],
}: {
  root: any;
  modals?: any[];
  overlays?: any[];
}) => {
  Navigation.setDefaultOptions({
    topBar: {
      title: {
        fontFamily: fonts.CIRCULAR,
      },
      subtitle: {
        fontFamily: fonts.CIRCULAR,
      },
      largeTitle: {
        fontFamily: fonts.CIRCULAR,
        fontSize: 30,
      },
    },
    statusBar: {
      visible: true,
      drawBehind: false,
    },
    bottomTab: {
      iconColor: colors.DARK_GRAY,
      selectedIconColor: colors.PURPLE,
      textColor: colors.DARK_GRAY,
      selectedTextColor: colors.PURPLE,
      fontFamily: fonts.CIRCULAR,
      fontSize: 13,
    },
    layout: {
      backgroundColor: 'white',
    },
  });

  Navigation.setRoot({
    root,
  });

  if (modals) {
    modals.forEach((modal) => Navigation.showModal(modal));
  }

  if (overlays) {
    overlays.forEach((overlay) => Navigation.showOverlay(overlay));
  }
};

export const setInitialLayout = async () => {
  const layout: any = await getInitialLayout();
  setLayout(layout);
};

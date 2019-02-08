import { AsyncStorage } from 'react-native';
import gql from 'graphql-tag';

import { client } from 'src/graphql/client';
import { InsuranceStatus } from 'src/graphql/components';

import { setLayout } from './setLayout';
import { getDebugLayout } from './debugLayout';
import { getMarketingLayout } from './marketingLayout';
import { getMainLayout } from './mainLayout';
import { getOfferLayout } from './offerLayout';
import { getChatLayout } from './chatLayout';

import {
  SEEN_MARKETING_CAROUSEL_KEY,
  IS_VIEWING_OFFER,
  LAUNCH_DEBUG,
} from 'src/constants';

import { shouldShowDashboard } from './utils';

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

export const setInitialLayout = async () => {
  const layout: any = await getInitialLayout();
  setLayout(layout);
};

import {
  getOfferGroup,
  OFFER_GROUPS,
} from 'src/navigation/screens/offer/ab-test';

import { getNewOfferLayout } from './newOfferLayout';
import { getOldOfferLayout } from './oldOfferLayout';

export const getOfferLayout: () => Promise<any> = async () => {
  if ((await getOfferGroup()) === OFFER_GROUPS.NEW) {
    return getNewOfferLayout();
  }

  return getOldOfferLayout();
};

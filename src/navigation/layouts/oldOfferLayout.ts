import { getChatLayout } from './chatLayout';

import { OFFER_SCREEN } from 'src/navigation/screens/offer';

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

import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';

export const getNewOfferLayout = () => ({
  root: {
    stack: {
      children: [NEW_OFFER_SCREEN],
    },
  },
});

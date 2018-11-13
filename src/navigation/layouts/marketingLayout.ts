import { MARKETING_SCREEN } from '../screens/marketing';

export const getMarketingLayout = () => ({
  root: {
    stack: {
      children: [MARKETING_SCREEN],
    },
  },
});

import Segment from '@hedviginsurance/react-native-analytics-segment-io';
import Branch from 'react-native-branch';

export const SemanticEvents = {
  Ecommerce: {
    CheckoutStarted: 'Checkout Started',
    CheckoutStepViewed: 'Checkout Step Viewed',
    CheckoutStepCompleted: 'Checkout Step Completed',
    PaymentInfoEntered: 'Payment Info Entered',
    OrderCompleted: 'Order Completed',
    PromotionViewed: 'Promotion Viewed',
  },
  Mobile: {
    ApplicationCrashed: 'Application Crashed',
    InstallAttributed: 'Install Attributed',
    DeepLinkOpened: 'Deep Link Opened',
  },
};

export const SegmentTracker = {
  identify: (userId, traits) => {
    return Segment.identify(userId, traits);
  },
  screen: Segment.screen,
  track: (event, properties) => {
    return Segment.track(event, properties);
  },
  group: Segment.group,
  flush: Segment.flush,
  reset: () => {
    Branch.logout();
    return Segment.reset();
  },
};

import { Platform } from 'react-native';
import Segment from '@hedviginsurance/react-native-analytics-segment-io';
import Branch, { BranchEvent } from 'react-native-branch';

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

const branchEventFromSegmentEvent = (event, properties) => {
  const mapSegmentToBranchEvent = {
    [SemanticEvents.Ecommerce.CheckoutStarted]: BranchEvent.InitiatePurchase,
    [SemanticEvents.Ecommerce.PaymentInfoEntered]: BranchEvent.AddPaymentInfo,
    [SemanticEvents.Ecommerce.OrderCompleted]: BranchEvent.Purchase,
  };

  const mapSegmentToBranchKeys = {
    order_id: 'transactionID',
    affiliation: 'affiliation',
    revenue: 'revenue',
    shipping: 'shipping',
    tax: 'tax',
    coupon: 'coupon',
    currency: 'currency',
    query: 'searchQuery',
  };

  const branchEventType = mapSegmentToBranchEvent[event];

  const branchProperties =
    properties &&
    Object.keys(properties).reduce((acc, segmentKey) => {
      const branchKey = mapSegmentToBranchKeys[segmentKey];
      const value = properties[segmentKey];
      if (branchKey) {
        acc[branchKey] = value;
      } else {
        acc.customData = { ...acc.customData, [segmentKey]: String(value) };
      }
      return acc;
    }, branchEventType ? { description: event } : {});

  return { branchEventType, branchProperties };
};

export const SegmentTracker = {
  initialize: ({ androidWriteKey, iosWriteKey, ...options }) => {
    if (Platform.OS === 'ios') {
      Segment.setup(iosWriteKey, options);
    } else if (Platform.OS === 'android') {
      Segment.setup(androidWriteKey, options).catch(() => {});
    }
  },
  identify: (userId, traits) => {
    if (userId) {
      Branch.setIdentity(userId);
    }
    return Segment.identify(userId, traits);
  },
  screen: Segment.screen,
  track: (event, properties) => {
    const { branchEventType, branchProperties } = branchEventFromSegmentEvent(
      event,
      properties,
    );

    if (branchEventType) {
      new BranchEvent(branchEventType, null, branchProperties).logEvent();
    }

    return Segment.track(event, properties);
  },
  group: Segment.group,
  flush: Segment.flush,
  reset: () => {
    Branch.logout();
    return Segment.reset();
  },
};

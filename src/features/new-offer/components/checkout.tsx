import * as React from 'react';
import { Platform } from 'react-native'
import { connect } from 'react-redux';
import { OFFER_CHECKOUT } from 'src/features/offer/state/actions';
import { NavigationEvents } from 'src/navigation/events';
import { Dialog } from 'src/features/bankid/Dialog';
import { Mount, Update } from 'react-lifecycle-components';

import { TRACK_OFFER_OPENED } from 'src/features/analytics/actions';
import { AndroidOfferState } from './android-offer-state';

interface CheckoutProps {
  monthlyCost: number;
  orderId: number;
  checkout: () => void;
  trackOfferOpen: (monthlyCost: number, orderId: number) => void;
}

export const CheckoutComp: React.SFC<CheckoutProps> = ({
  checkout,
  orderId,
  trackOfferOpen,
  monthlyCost,
}) => (
    <>
      <Mount on={() => trackOfferOpen(monthlyCost, orderId)}>{null}</Mount>
      {Platform.OS === 'ios' ? (<NavigationEvents
        onGlobalEvent={(event: { id: string }) => {
          if (event.id === 'SignButtonPressed') {
            checkout();
          }
        }}
      />) : (
          <AndroidOfferState>
            {({ isCheckingOut, setIsCheckingOut }) => (
              <Update<boolean>
                was={() => {
                  if (isCheckingOut) {
                    setIsCheckingOut(false)
                    checkout()
                  }
                }}
                watched={isCheckingOut}
              >
                {null}
              </Update>
            )}
          </AndroidOfferState>
        )}
      <Dialog />
    </>
  );

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkout: () => {
      dispatch({
        type: OFFER_CHECKOUT,
      });
    },
    trackOfferOpen: (pricePerMonth: number, orderId: number) =>
      dispatch({
        type: TRACK_OFFER_OPENED,
        payload: {
          revenue: pricePerMonth,
          currency: 'SEK',
          order_id: orderId,
        },
      }),
  };
};

export const Checkout = connect(
  ({ analytics }: { analytics: { orderId: number } }) => ({
    orderId: analytics.orderId,
  }),
  mapDispatchToProps,
)(CheckoutComp);

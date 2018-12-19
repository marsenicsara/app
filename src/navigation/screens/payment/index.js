import React from 'react';
import { Platform } from 'react-native';
import Payment from '../../../features/payment';
import { StandalonePayment } from 'src/features/payment/StandalonePayment';
import { CLOSE_BUTTON } from './buttons';
import { navigationConstants } from '../../constants';

class PaymentScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        title: {
          text: 'Betalning',
        },
        leftButtons: [CLOSE_BUTTON],
      },
      statusBar: {
        visible: true,
        style: Platform.OS === 'android' ? 'light' : 'dark',
        drawBehind: false,
      },
      layout: {
        topMargin: navigationConstants.statusBarHeight * 3,
      },
    };
  }

  render() {
    if (this.props.startedFromChat) {
      return <Payment {...this.props} />;
    }

    return <StandalonePayment {...this.props} />;
  }
}

export const PAYMENT_SCREEN = {
  component: {
    name: 'PaymentScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(PAYMENT_SCREEN.component.name, () => PaymentScreen);

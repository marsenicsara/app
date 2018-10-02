import React from 'react';
import { colors } from '@hedviginsurance/brand';
import { Navigation } from 'react-native-navigation';

import { NewOffer } from 'src/features/new-offer';
import { ComponentRegistrator } from '../types';
import { NavigationEvents } from 'src/navigation/events';
import {
  SIGN_BUTTON,
  CHAT_BUTTON,
} from 'src/navigation/screens/new-offer/buttons';

class NewOfferScreen extends React.Component {
  static get options() {
    return {
      layout: {
        backgroundColor: colors.BLACK_PURPLE,
      },
      popGesture: false,
      topBar: {
        visible: true,
        title: {
          text: '',
          color: 'white',
        },
        subtitle: {
          text: '',
          color: 'white',
        },
        background: {
          color: colors.BLACK_PURPLE,
        },
        leftButtons: [CHAT_BUTTON],
        rightButtons: [SIGN_BUTTON],
      },
      statusBar: {
        visible: true,
        style: 'light',
        drawBehind: false,
      },
    };
  }

  render() {
    return (
      <>
        <NavigationEvents
          onNavigationButtonPressed={(_: any, componentId: string) =>
            Navigation.dismissModal(componentId)
          }
          onGlobalEvent={(event: any) => console.log(event)}
        />
        <NewOffer {...this.props} />
      </>
    );
  }
}

export const NEW_OFFER_SCREEN = {
  component: {
    name: 'NewOfferScreen',
  },
};

export const register = (registerComponent: ComponentRegistrator) =>
  registerComponent(NEW_OFFER_SCREEN.component.name, () => NewOfferScreen);

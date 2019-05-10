import React from 'react';
import { Platform } from 'react-native';
import { HEDVIG_LOGO_TITLE_COMPONENT } from '../../components/hedvigLogoTitle';
import Chat from '../../../features/chat/Chat';
import { colors } from '@hedviginsurance/brand';

import { RESTART_BUTTON } from './buttons';

class ChatScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        background: {
          color: colors.OFF_WHITE,
          blur: true,
        },
        drawBehind: false,
        title: Platform.select({
          ios: {
            component: HEDVIG_LOGO_TITLE_COMPONENT,
          },
          android: {
            externalComponent: { name: 'logo' },
            alignment: 'center',
          },
        }),
        rightButtons: [RESTART_BUTTON],
        backButton: {
          visible: false,
        },
      },
      statusBar: {
        visible: true,
        style: Platform.OS === 'android' ? 'light' : 'dark',
      },
      popGesture: false,
    };
  }

  render() {
    return <Chat {...this.props} />;
  }
}

export const chatScreen = (intent) => ({
  component: {
    name: 'ChatScreen',
    passProps: {
      intent,
    },
  },
});

export const CHAT_SCREEN = {
  component: {
    name: 'ChatScreen',
  },
};

export const register = (registerComponent) => {
  registerComponent(CHAT_SCREEN.component.name, () => ChatScreen);
};

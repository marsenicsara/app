import React from 'react';
import { HEDVIG_LOGO_TITLE_COMPONENT } from '../../components/hedvigLogoTitle';
import Chat from '../../../features/chat/Chat';

import { RESTART_BUTTON } from './buttons';

class ChatScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        title: {
          component: HEDVIG_LOGO_TITLE_COMPONENT,
        },
        rightButtons: [RESTART_BUTTON],
        backButton: {
          visible: false,
        },
      },
      statusBar: {
        visible: true,
        style: 'light',
      },
      popGesture: false,
    };
  }

  render() {
    return <Chat {...this.props} />;
  }
}

export const CHAT_SCREEN = {
  component: {
    name: 'ChatScreen',
  },
};

export const register = (registerComponent) => {
  registerComponent(CHAT_SCREEN.component.name, () => ChatScreen);
};

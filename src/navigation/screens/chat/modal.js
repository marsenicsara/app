import React from 'react';
import { HEDVIG_LOGO_TITLE_COMPONENT } from '../../components/hedvigLogoTitle';
import Chat from '../../../features/chat/Chat';
import { navigationConstants } from '../../constants';

import { CLOSE_BUTTON } from './buttons';

class ChatScreenModal extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        title: {
          component: HEDVIG_LOGO_TITLE_COMPONENT,
        },
        leftButtons: [CLOSE_BUTTON],
      },
      statusBar: {
        visible: true,
        drawBehind: false,
        style: 'light',
      },
      layout: {
        topMargin: navigationConstants.statusBarHeight * 3,
      },
    };
  }

  render() {
    return <Chat {...this.props} isModal={true} />;
  }
}

export const CHAT_SCREEN_MODAL = {
  component: {
    name: 'ChatScreenModal',
  },
};

export const register = (registerComponent) =>
  registerComponent(CHAT_SCREEN_MODAL.component.name, () => ChatScreenModal);

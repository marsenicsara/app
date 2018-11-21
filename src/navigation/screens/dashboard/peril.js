import React from 'react';
import { HEDVIG_LOGO_TITLE_COMPONENT } from '../../components/hedvigLogoTitle';
import { Perils } from '../../../components/Perils';
import { navigationConstants } from '../../constants';

import { CLOSE_BUTTON } from './buttons';

class PerilScreen extends React.Component {
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
        style: 'dark',
        drawBehind: false,
      },
      layout: {
        topMargin: navigationConstants.statusBarHeight * 3,
      },
    };
  }

  render() {
    return <Perils {...this.props} />;
  }
}

export const PERIL_SCREEN = {
  component: {
    name: 'PerilScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(PERIL_SCREEN.component.name, () => PerilScreen);

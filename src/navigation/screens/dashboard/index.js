import { Platform } from 'react-native';
import * as React from 'react';
import { Dashboard } from 'src/features/dashboard';
import Fab from '../../../features/dashboard/containers/fab';

class DashboardScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        largeTitle: {
          visible: true,
        },
        title: {
          text: 'Min hemförsäkring',
        },
      },
      statusBar: {
        visible: true,
        style: 'dark',
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Dashboard {...this.props} />
        {Platform.OS === 'android' && <Fab />}
      </React.Fragment>
    );
  }
}

export const DASHBOARD_SCREEN = {
  component: {
    name: 'DashboardScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(DASHBOARD_SCREEN.component.name, () => DashboardScreen);

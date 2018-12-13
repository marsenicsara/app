import { Platform } from 'react-native';
import React from 'react';
import { Profile } from 'src/features/profile';
import Fab from '../../../features/dashboard/containers/fab';

class ProfileScreen extends React.Component {
  static get options() {
    return {
      topBar: {
        visible: true,
        largeTitle: {
          visible: true,
        },
        title: {
          text: 'Min profil',
        },
      },
      statusBar: {
        visible: true,
        style: Platform.OS === 'android' ? 'light' : 'dark',
      },
    };
  }

  render() {
    return (
      <React.Fragment>
        <Profile {...this.props} />
        {Platform.OS === 'android' && <Fab />}
      </React.Fragment>
    );
  }
}

export const PROFILE_SCREEN = {
  component: {
    name: 'ProfileScreen',
  },
};

export const register = (registerComponent) =>
  registerComponent(PROFILE_SCREEN.component.name, () => ProfileScreen);

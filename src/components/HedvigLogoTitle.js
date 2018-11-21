import React from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { DebugShortcut } from './DebugShortcut';

const styles = StyleSheet.create({
  hedvigLogo: {
    width: 96,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        marginTop: 17,
      },
      ios: {},
    }),
  },
});

export class HedvigLogoTitle extends React.Component {
  render() {
    return (
      <DebugShortcut>
        <Image
          source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark.png')}
          style={styles.hedvigLogo}
        />
      </DebugShortcut>
    );
  }
}

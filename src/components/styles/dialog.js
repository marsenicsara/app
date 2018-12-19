import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { colors, fonts } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 8,
  },
  heading: {
    fontFamily: fonts.CIRCULAR,
    fontSize: 24,
    marginTop: 24,
    marginBottom: 16,
    paddingRight: 16,
    paddingLeft: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    marginBottom: 24,
    paddingRight: 16,
    paddingLeft: 16,
    textAlign: 'center',
  },
  buttonsContainer: { flexDirection: 'row' },
  dialogButton: {
    flex: 1,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.OFF_WHITE,
    borderRightColor: colors.OFF_WHITE,
  },
  dialogButtonBorderRight: { borderRightWidth: 1 },
  buttonText: {
    fontFamily: 'CircularStd-Book',
    color: colors.PURPLE,
    fontSize: 16,
  },
});

export class DialogContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.container} />;
  }
}

export class Heading extends React.Component {
  render() {
    return <Text {...this.props} style={styles.heading} />;
  }
}

export class Paragraph extends React.Component {
  render() {
    return <Text {...this.props} style={styles.paragraph} />;
  }
}

export class ButtonsContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.buttonsContainer} />;
  }
}

export class StyledDialogButton extends React.Component {
  render() {
    const { borderRight, ...props } = this.props;
    return (
      <TouchableOpacity
        {...props}
        style={[
          styles.dialogButton,
          borderRight ? styles.dialogButtonBorderRight : undefined,
        ]}
        accessibilityComponentType="button"
        accessibilityTraits="button"
      />
    );
  }
}

export class StyledDialogButtonText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.buttonText} />;
  }
}

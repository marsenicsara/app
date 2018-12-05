import React from 'react';
import { Text, StyleSheet } from 'react-native';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  description: {
    fontFamily: 'CircularStd-Book',
    fontSize: 17,
    color: colors.DARK_GRAY,
    lineHeight: 23,
  },
});

export class Description extends React.Component {
  render() {
    return <Text style={styles.description}>{this.props.children}</Text>;
  }
}

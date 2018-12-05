import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 23,
    lineHeight: 32,
    color: colors.OFF_BLACK,
    marginBottom: 7,
  },
});

export class Heading extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return <Text style={styles.heading}>{this.props.children}</Text>;
  }
}

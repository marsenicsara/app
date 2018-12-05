import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 12,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  label: {
    flex: 1,
    fontFamily: 'CircularStd-Book',
    fontSize: 17,
    lineHeight: 24,
    color: colors.DARK_GRAY,
  },
});

export class CheckedBullet extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.icon}
          source={require('../../../../assets/icons/offer/offer-check.png')}
        />
        <Text style={styles.label}>{this.props.label}</Text>
      </View>
    );
  }
}

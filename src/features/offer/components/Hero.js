import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../../services/DimensionSizes';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  hero: {
    width: viewportWidth,
  },
  image: {
    width: viewportWidth,
    height: {
      [VerticalSizeClass.SPACIOUS]: 250,
      [VerticalSizeClass.REGULAR]: 170,
      [VerticalSizeClass.COMPACT]: 130,
    }[verticalSizeClass],
  },
});

export class Hero extends React.Component {
  render() {
    const { containerStyle = {} } = this.props;
    const resizeMode = {
      [VerticalSizeClass.SPACIOUS]: 'cover',
      [VerticalSizeClass.REGULAR]: 'contain',
      [VerticalSizeClass.COMPACT]: 'contain',
    }[verticalSizeClass];

    return (
      <View style={[styles.hero, containerStyle]}>
        <Image
          resizeMode={resizeMode}
          style={styles.image}
          source={this.props.source}
        />
      </View>
    );
  }
}

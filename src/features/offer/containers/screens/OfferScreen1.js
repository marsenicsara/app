import { connect } from 'react-redux';

import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../../../services/DimensionSizes';

import { colors } from '@hedviginsurance/brand';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flex: 1,
    width: viewportWidth,
    height: viewportHeight,
  },
  background: {
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: colors.TURQUOISE,
  },
  scrollContent: {
    width: viewportWidth,
    height: viewportHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  heading: {
    position: 'absolute',
    top: {
      [VerticalSizeClass.SPACIOUS]: 60,
      [VerticalSizeClass.REGULAR]: 50,
      [VerticalSizeClass.COMPACT]: 43,
    }[verticalSizeClass],
  },
  headingText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 26,
    lineHeight: 35,
    color: colors.WHITE,
    textAlign: 'center',
  },
  categoryHeader: {
    marginTop: {
      [VerticalSizeClass.COMPACT]: '23%',
      [VerticalSizeClass.REGULAR]: '21%',
      [VerticalSizeClass.COMPACT]: '21%',
    }[verticalSizeClass],
    marginBottom: {
      [VerticalSizeClass.COMPACT]: '23%',
      [VerticalSizeClass.REGULAR]: '21%',
      [VerticalSizeClass.COMPACT]: '19%',
    }[verticalSizeClass],
    fontFamily: 'CircularStd-Bold',
    fontSize: 20,
    lineHeight: 20,
    color: colors.WHITE,
    textAlign: 'center',
  },
});

class OfferScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          resizeMode="cover"
          source={require('../../../../../assets/offer/hero/intro.png')}
        >
          <ScrollView style={styles.scroll}>
            <View style={styles.scrollContent}>
              <View style={styles.heading}>
                <Text style={styles.headingText}>
                  Din hemförsäkring
                  {'\n'}
                  innehåller
                </Text>
              </View>
              <View style={styles.content}>
                <Text style={styles.categoryHeader}>Personskydd</Text>
                <Text style={styles.categoryHeader}>Prylskydd</Text>
                <Text style={styles.categoryHeader}>Lägenhetsskydd</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const OfferContainer = connect(
  null,
  null,
)(OfferScreen);

export default OfferContainer;

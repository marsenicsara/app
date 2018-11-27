import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { chatActions } from 'hedvig-redux';
import { getMarketingLayout } from 'src/navigation/layouts/marketingLayout';
import { deleteToken } from 'src/graphql/context';
import { Store } from 'src/setupApp';
import { setLayout } from 'src/navigation/layouts/setLayout';
import styled from '@sampettersson/primitives';
import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
  ImageBackground,
} from 'react-native';
import { Mutation } from 'react-apollo';
import {
  verticalSizeClass,
  V_SPACIOUS,
  V_REGULAR,
  V_COMPACT,
} from '../../../../services/DimensionSizes';
import { colors } from '@hedviginsurance/brand';
import { RestartOfferChat } from '../../../../components/RestartOfferChat';

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
      [V_SPACIOUS]: 60,
      [V_REGULAR]: 50,
      [V_COMPACT]: 43,
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
      [V_SPACIOUS]: '23%',
      [V_REGULAR]: '21%',
      [V_COMPACT]: '21%',
    }[verticalSizeClass],
    marginBottom: {
      [V_SPACIOUS]: '23%',
      [V_REGULAR]: '21%',
      [V_COMPACT]: '19%',
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
                <RestartOfferChat />
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

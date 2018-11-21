import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as R from 'ramda';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import {
  horizontalSizeClass,
  verticalSizeClass,
  HorizontalSizeClass,
  VerticalSizeClass,
} from '../../../../services/DimensionSizes';
import { Hero } from '../../components/Hero';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  heroBackground: {
    backgroundColor: colors.PURPLE,
  },
  heading: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 23,
    lineHeight: 32,
    color: colors.OFF_BLACK,
    marginBottom: {
      [VerticalSizeClass.SPACIOUS]: 15,
      [VerticalSizeClass.REGULAR]: 15,
      [VerticalSizeClass.COMPACT]: 0,
    }[verticalSizeClass],
    textAlign: 'center',
  },
  stepsContainer: {
    width: {
      [HorizontalSizeClass.SPACIOUS]: 350,
      [HorizontalSizeClass.REGULAR]: 320,
      [HorizontalSizeClass.COMPACT]: '100%',
    }[horizontalSizeClass],
    alignSelf: 'center',
  },
  step: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: {
      [VerticalSizeClass.SPACIOUS]: 20,
      [VerticalSizeClass.REGULAR]: 20,
      [VerticalSizeClass.COMPACT]: 6,
    }[verticalSizeClass],
    position: 'relative',
    alignItems: 'center',
  },
  stepNumber: {
    backgroundColor: colors.PURPLE,
    width: 35,
    height: 35,
    marginRight: 15,
    borderRadius: 20,
    justifyContent: 'center',
  },
  stepNumberText: {
    top: -1,
    position: 'relative',
    fontFamily: 'CircularStd-Book',
    fontSize: 19,
    color: colors.WHITE,
    textAlign: 'center',
  },
  stepLabel: {
    flex: 1,
    fontFamily: 'CircularStd-Book',
    fontSize: 19,
    color: colors.DARK_GRAY,
    lineHeight: 27,
  },
});

const insuranceNames = [
  {
    currentInsurerName: 'LANSFORSAKRINGAR',
    displayName: <Text>från&nbsp;Länsförsäkringar</Text>,
  },
  {
    currentInsurerName: 'IF',
    displayName: <Text>från&nbsp;If</Text>,
  },
  {
    currentInsurerName: 'FOLKSAM',
    displayName: <Text>från&nbsp;Folksam</Text>,
  },
  {
    currentInsurerName: 'TRYGG_HANSA',
    displayName: <Text>från&nbsp;Trygg-Hansa</Text>,
  },
  {
    currentInsurerName: 'MODERNA',
    displayName: <Text>från Moderna&nbsp;Försäkringar</Text>,
  },
  {
    currentInsurerName: 'ICA',
    displayName: <Text>från ICA&nbsp;Försäkring</Text>,
  },
  {
    currentInsurerName: 'GJENSIDIGE',
    displayName: <Text>från&nbsp;Gjensidige</Text>,
  },
  {
    currentInsurerName: 'VARDIA',
    displayName: <Text>från&nbsp;Vardia</Text>,
  },
  {
    currentInsurerName: 'OTHER',
    displayName: <Text>från din nuvarande försäkring</Text>,
  },
];

const QUERY = gql`
  query SwitcherScreen {
    insurance {
      currentInsurerName
    }
  }
`;

const getDisplayName = (currentInsurerName) =>
  R.find(R.propEq('currentInsurerName', currentInsurerName))(insuranceNames)
    .displayName;

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/switch.png');
    const spacious = require('../../../../../assets/offer/hero/switch-xl.png');
    const heroImage =
      {
        [VerticalSizeClass.SPACIOUS]: spacious,
      }[verticalSizeClass] || regular;

    const { disableScroll } = this.props;

    const ContainerComp = disableScroll ? View : ScrollView;

    return (
      <Query query={QUERY}>
        {({ data, loading, error }) =>
          loading || error ? null : (
            <View style={styles.container}>
              <Hero containerStyle={styles.heroBackground} source={heroImage} />
              <ContainerComp style={styles.scroll}>
                <View style={styles.scrollContent}>
                  <View style={styles.content}>
                    <Text style={styles.heading}>
                      Hedvig sköter bytet{' '}
                      {getDisplayName(data.insurance.currentInsurerName)}
                    </Text>

                    <View style={styles.stepsContainer}>
                      <View style={styles.step}>
                        <View style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <Text style={styles.stepLabel}>
                          Signera med ditt mobila&nbsp;BankID
                        </Text>
                      </View>
                      <View style={styles.step}>
                        <View style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <Text style={styles.stepLabel}>
                          Hedvig kontaktar ditt försäkringsbolag och säger upp
                          din gamla försäkring
                        </Text>
                      </View>
                      <View style={styles.step}>
                        <View style={styles.stepNumber}>
                          <Text style={styles.stepNumberText}>3</Text>
                        </View>
                        <Text style={styles.stepLabel}>
                          Din Hedvigförsäkring aktiveras samma dag som din gamla
                          försäkring går ut
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </ContainerComp>
            </View>
          )
        }
      </Query>
    );
  }
}

export default OfferScreen;

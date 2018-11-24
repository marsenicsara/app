import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PerilsQuery } from './perils-query';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';

import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: {
    backgroundColor: '#f8f7f9',
  },
});

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/house.png');
    const spacious = require('../../../../../assets/offer/hero/house-xl.png');
    const heroImage =
      {
        [VerticalSizeClass.SPACIOUS]: spacious,
      }[verticalSizeClass] || regular;

    return (
      <PerilsQuery>
        {({ data, loading, error }) =>
          loading || error ? null : (
            <View style={styles.container}>
              <PerilsOverview
                title={
                  <TranslationsPlaceholderConsumer
                    replacements={{ address: data.insurance.address }}
                    textKey="OFFER_APARTMENT_PROTECTION_TITLE"
                  >
                    {(nodes) => nodes}
                  </TranslationsPlaceholderConsumer>
                }
                categoryTitle={data.insurance.perilCategories[1].title}
                description={
                  <TranslationsConsumer textKey="OFFER_APARTMENT_PROTECTION_DESCRIPTION">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                perils={data.insurance.perilCategories[1].perils}
                hero={
                  <Hero
                    containerStyle={styles.heroBackground}
                    source={heroImage}
                  />
                }
              />
            </View>
          )
        }
      </PerilsQuery>
    );
  }
}

export default OfferScreen;

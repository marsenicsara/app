import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';

import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';
import { isStudentInsurance } from '../../../../utils';
import { PerilsQuery } from './perils-query';

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroBackground: {
    backgroundColor: '#f5f4f7',
  },
});

class OfferScreen extends React.Component {
  render() {
    const regular = require('../../../../../assets/offer/hero/stuff.png');
    const spacious = require('../../../../../assets/offer/hero/stuff-xl.png');
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
                  <TranslationsConsumer textKey="OFFER_STUFF_PROTECTION_TITLE">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                categoryTitle={data.insurance.perilCategories[2].title}
                description={
                  <TranslationsPlaceholderConsumer
                    textKey="OFFER_STUFF_PROTECTION_DESCRIPTION"
                    replacements={{
                      protectionAmount: (
                        <TranslationsConsumer
                          textKey={
                            isStudentInsurance(data.insurance.type)
                              ? 'STUFF_PROTECTION_AMOUNT_STUDENT'
                              : 'STUFF_PROTECTION_AMOUNT'
                          }
                        >
                          {(text) => text}
                        </TranslationsConsumer>
                      ),
                    }}
                  >
                    {(nodes) => nodes}
                  </TranslationsPlaceholderConsumer>
                }
                perils={data.insurance.perilCategories[2].perils}
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

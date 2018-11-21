import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import {
  verticalSizeClass,
  VerticalSizeClass,
  HorizontalSizeClass,
} from '../../../../services/DimensionSizes';
import { PerilsOverview } from '../PerilsOverview';
import { Hero } from '../../components/Hero';
import { PerilsQuery } from './perils-query';
import styled from '@sampettersson/primitives';
import { Peril } from '../PerilsDialog';

const styles = StyleSheet.create({
  heroBackground: {
    backgroundColor: '#f5f4f7',
  },
});

const Container = styled(View)({
  flex: 1
})

const regular = require('assets/offer/hero/you.png');
const spacious = require('assets/offer/hero/you-xl.png');

const OfferScreen: React.SFC = () => {
  const heroImage =
    {
      [VerticalSizeClass.SPACIOUS]: spacious,
      [HorizontalSizeClass.SPACIOUS]: spacious,
      [VerticalSizeClass.REGULAR]: regular,
      [VerticalSizeClass.COMPACT]: regular,
      [HorizontalSizeClass.REGULAR]: regular,
      [HorizontalSizeClass.COMPACT]: regular
    }[verticalSizeClass]

  return (
    <PerilsQuery>
      {({ data, loading, error }) =>
        loading || !data || error ? null : (
          <Container>
            <PerilsOverview
              title={
                <TranslationsConsumer textKey="OFFER_PERSONAL_PROTECTION_TITLE">
                  {(text) => text}
                </TranslationsConsumer>
              }
              categoryTitle={data.insurance.perilCategories![0].title!}
              description={
                <TranslationsConsumer textKey="OFFER_PERSONAL_PROTECTION_DESCRIPTION">
                  {(text) => text}
                </TranslationsConsumer>
              }
              perils={data.insurance.perilCategories![0].perils! as Peril[]}
              explainer={
                <TranslationsConsumer textKey="OFFER_PERILS_EXPLAINER">
                  {(text) => text}
                </TranslationsConsumer>
              }
              hero={
                <Hero
                  containerStyle={styles.heroBackground}
                  source={heroImage}
                />
              }
            />
          </Container>
        )
      }
    </PerilsQuery>
  );
}

export default OfferScreen

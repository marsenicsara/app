import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  verticalSizeClass,
  V_SPACIOUS,
  V_REGULAR,
  V_COMPACT,
} from '../../../services/DimensionSizes';
import { PERIL_IMAGE_MAP } from '../../../features/dashboard/components/Peril';
import { PERILS_SET_ACTIVE } from '../state/actions';
import { Description } from '../components/Description';
import { Heading } from '../components/Heading';

import { colors } from '@hedviginsurance/brand';
import { Navigation } from 'react-native-navigation';
import { PERIL_COMPONENT } from 'src/navigation/components/peril';
import styled from '@sampettersson/primitives';

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: colors.WHITE,
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  perilsDescription: {
    paddingTop: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  perilsWrapper: {
    marginTop: 30,
    paddingLeft: 1,
    paddingRight: 1,
  },
  perilsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 'auto',
  },
  peril: {
    width: '25%',
    alignItems: 'center',
  },
  perilTitle: {
    paddingLeft: 7,
    paddingRight: 7,
    fontFamily: 'CircularStd-Book',
    fontSize: 15,
    color: colors.DARK_GRAY,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 10,
  },
  moreInfo: {
    color: '#cbcbd0',
    fontFamily: 'CircularStd-Book',
    fontSize: 17,
    textAlign: 'center',
    // @ts-ignore
    marginTop: {
      [V_SPACIOUS]: 50,
      [V_REGULAR]: 35,
      [V_COMPACT]: 20,
    }[verticalSizeClass],
  },
});

const Container = styled(View)({
  flex: 1
})

const PerilIcon = styled(Image)({
  width: 51, height: 51
})

const hitSlop = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5,
};

interface PerilsOverviewProps {
  disableScroll?: boolean
  hero: React.ReactElement<any>
  title: React.ReactElement<any>
  description: React.ReactElement<any>
  perils: any[]
  categoryTitle: string
  explainer?: React.ReactElement<any>
}

export const PerilsOverview: React.SFC<PerilsOverviewProps> = ({ disableScroll, hero, title, description, perils, categoryTitle, explainer }) => {
  const ContainerComp = disableScroll ? View : ScrollView;

  return (
    <Container>
      {hero}
      <ContainerComp style={styles.scroll}>
        <View style={styles.scrollContent}>
          <View style={styles.perilsDescription}>
            <Heading>{title}</Heading>
            <Description>{description}</Description>
          </View>
          <View style={styles.perilsWrapper}>
            <View style={styles.perilsContainer}>
              {perils.map((peril, index) => (
                <TouchableOpacity
                  onPress={() => {
                    Navigation.showOverlay({
                      component: {
                        name: PERIL_COMPONENT.name,
                        passProps: {
                          peril,
                          categoryTitle,
                        },
                        options: {
                          layout: {
                            backgroundColor: 'transparent'
                          }
                        }
                      },
                    });
                  }}
                  hitSlop={hitSlop}
                  style={styles.peril}
                  key={index}
                  accessibilityComponentType="button"
                  accessibilityTraits="image"
                >
                  <PerilIcon
                    // @ts-ignore
                    source={PERIL_IMAGE_MAP[peril.id]}
                  />
                  <Text style={styles.perilTitle}>{peril.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          {explainer ? (
            <Text style={styles.moreInfo}>{explainer}</Text>
          ) : null}
        </View>
      </ContainerComp>
    </Container>
  );
};

import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, ViewStyle, Animated, Dimensions } from 'react-native';
import { Arrow } from 'src/components/icons/Arrow';
import { Spacing } from 'src/components/Spacing';
import { Spring, Delay, Sequence } from 'animated-react-native-components';
import { colors } from '@hedviginsurance/brand';

import OfferScreen2 from 'src/features/offer/containers/screens/OfferScreen2';
import OfferScreen3 from 'src/features/offer/containers/screens/OfferScreen3';
import OfferScreen4 from 'src/features/offer/containers/screens/OfferScreen4';
import OfferScreen5 from 'src/features/offer/containers/screens/OfferScreen5';
import OfferScreen7 from 'src/features/offer/containers/screens/OfferScreen7';

import { Header } from './header';
import { GetHedvig } from './get-hedvig';

const Content = styled(View)({
  backgroundColor: colors.WHITE,
  width: '100%',
  shadowColor: colors.BLACK,
  shadowOpacity: 0.1,
  shadowRadius: 20,
  shadowOffset: {
    height: -20,
    width: 0,
  },
});

const AnimatedView = Animated.createAnimatedComponent<ViewStyle>(View);

const ScrollContentContainer = styled(AnimatedView)(
  ({ translateY }: { translateY: Animated.Value }) => ({
    width: '100%',
    alignItems: 'center',
    transform: [{ translateY }],
  }),
);

const ArrowContainer = styled(AnimatedView)(
  ({ scrollAnimatedValue }: { scrollAnimatedValue: Animated.Value }) => ({
    opacity: scrollAnimatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    }),
  }),
);

interface ScrollContentProps {
  scrollAnimatedValue: Animated.Value;
  insuredAtOtherCompany: boolean;
}

export const ScrollContent: React.SFC<ScrollContentProps> = ({
  scrollAnimatedValue,
  insuredAtOtherCompany,
}) => (
    <Sequence>
      <Delay config={{ delay: 950 }} />
      <Spring
        config={{
          bounciness: 5,
        }}
        toValue={0}
        initialValue={Dimensions.get('window').height * 0.3}
      >
        {(translateY) => (
          <ScrollContentContainer translateY={translateY}>
            <ArrowContainer scrollAnimatedValue={scrollAnimatedValue}>
              <Arrow arrowFill={colors.WHITE} width={20} height={20} />
            </ArrowContainer>
            <Spacing height={20} />
            <Content>
              <Header />
              <OfferScreen4 disableScroll />
              <OfferScreen3 disableScroll />
              <OfferScreen2 />
              <OfferScreen5 disableScroll />
              {insuredAtOtherCompany && <OfferScreen7 disableScroll />}
              <GetHedvig scrollAnimatedValue={scrollAnimatedValue} />
            </Content>
          </ScrollContentContainer>
        )}
      </Spring>
    </Sequence>
  );

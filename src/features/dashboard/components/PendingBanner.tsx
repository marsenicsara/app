import * as React from 'react';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text } from 'react-native';
import { ReadMore } from './ReadMore';
import Lottie from 'lottie-react-native';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const animationModule = require('assets/animations/loading.json');

const Wrapper = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -getStatusBarHeight() - 15,
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 0,
});

const ActivationText = styled(Text)(({ textColor }: { textColor: string }) => ({
  color: textColor,
  textAlign: 'center',
  fontSize: 16,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '100',
  marginBottom: 12,
  marginTop: 66,
}));

const LottieAnimation = styled(Lottie)({
  height: 50,
  marginBottom: 27,
});

interface Props {
  statusCode: InsuranceStatus;
}

export const PendingBanner: React.SFC<Props> = ({ statusCode }) => (
  <Wrapper>
    <Row>
      <ActivationText textColor={colors.BLACK}>
        <TranslationsConsumer textKey="DASHBOARD_NOT_STARTED_BANNER_TITLE">
          {(text) => text}
        </TranslationsConsumer>{' '}
      </ActivationText>
    </Row>
    <Row>
      <LottieAnimation
        ref={(animation) => {
          animation = animation;
        }}
        loop
        autoPlay
        source={animationModule}
      />
    </Row>
    <ReadMore status={statusCode} />
  </Wrapper>
);

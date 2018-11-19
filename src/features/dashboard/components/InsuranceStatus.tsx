import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styled from '@sampettersson/primitives';

import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const Icon = styled(Image)({
  marginTop: 24,
  marginLeft: 5,
  width: 32,
  height: 32,
});

const StatusText = styled(Text)({
  marginTop: 8,
  marginBottom: 8,
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontSize: 14,
});

const Container = styled(View)({
  flexDirection: 'column',
  alignItems: 'center',
});

const InsuranceStatusDisplay: React.SFC = ({}) => (
  <Container>
    <Icon source={require('assets/icons/my_insurance/aktiv.png')} />
    <StatusText>
      <TranslationsConsumer textKey="DASHBOARD_BANNER_ACTIVE_INFO">
        {(text) => text}
      </TranslationsConsumer>
    </StatusText>
  </Container>
);

export { InsuranceStatusDisplay };

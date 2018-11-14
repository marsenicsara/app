import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styled from '@sampettersson/primitives';

import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const Icon = styled(Image)({
  marginLeft: 5,
  width: 16,
  height: 16,
});

const StatusText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontSize: 14,
});

const Container = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
});

const InsuranceStatusDisplay: React.SFC = ({}) => (
  <Container>
    <StatusText>
      <TranslationsConsumer textKey="DASHBOARD_BANNER_ACTIVE_INFO">
        {(text) => text}
      </TranslationsConsumer>
    </StatusText>
    <Icon source={require('assets/icons/my_insurance/aktiv.png')} />
  </Container>
);

export { InsuranceStatusDisplay };

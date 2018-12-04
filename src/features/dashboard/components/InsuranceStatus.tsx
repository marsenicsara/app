import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styled from '@sampettersson/primitives';
import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { CircledCross } from 'src/components/icons/CircledCross';
// import { CircledCheckmarkFilled } from 'src/components/icons/CircledCheckmarkFilled';

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

interface Props {
  active: boolean;
}

const InsuranceStatusDisplay: React.SFC<Props> = ({ active }) => (
  <Container>
    {active ? (
      <CircledCross width={32} height={32} />
    ) : (
      <CircledCross width={32} height={32} />
    )}
    <Icon
      source={
        active
          ? require('assets/icons/my_insurance/aktiv_32px.png')
          : require('assets/icons/info/info_blue_32px.png')
      }
    />
    <StatusText>
      <TranslationsConsumer
        textKey={
          active
            ? 'DASHBOARD_BANNER_ACTIVE_INFO'
            : 'DASHBOARD_BANNER_TERMINATED_INFO'
        }
      >
        {(text) => text}
      </TranslationsConsumer>
    </StatusText>
  </Container>
);

export { InsuranceStatusDisplay };

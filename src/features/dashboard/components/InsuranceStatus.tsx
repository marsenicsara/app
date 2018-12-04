import * as React from 'react';
import { View, Text } from 'react-native';
import styled from '@sampettersson/primitives';
import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { InfoCircle } from 'src/components/icons/InfoCircle';
import { FilledCircledCheckmark } from 'src/components/icons/FilledCheckmark';

const IconContainer = styled(View)({
  marginTop: 24,
  marginLeft: 5,
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
    <IconContainer>
      {active ? (
        <FilledCircledCheckmark
          width={32}
          height={32}
          checkmarkLineColor={colors.WHITE}
        />
      ) : (
        <InfoCircle width={32} height={32} />
      )}
    </IconContainer>
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

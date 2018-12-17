import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';

import { colors, fonts } from '@hedviginsurance/brand';
import { Spacing } from '../../components/Spacing';

import { CircledCross } from '../../components/icons/CircledCross';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const Container = styled(View)({
  padding: 20,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const Title = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 35,
  color: colors.PINK,
});

const Body = styled(Text)({
  fontFamily: 'CircularStd-Book',
  fontSize: 18,
  color: colors.BLACK,
  textAlign: 'center',
  maxWidth: '80%',
});

const Button = styled(TouchableOpacity)({
  borderRadius: 40,
  padding: 20,
  paddingRight: 40,
  paddingLeft: 40,
  backgroundColor: colors.GREEN,
});

const ButtonText = styled(Text)({
  color: colors.WHITE,
  fontSize: 18,
  fontFamily: 'CircularStd-Book',
});

interface PaymentFailureProps {
  onPressContinue: () => void;
}

export const PaymentFailure: React.SFC<PaymentFailureProps> = ({
  onPressContinue,
}) => (
    <Container>
      <CircledCross width={100} height={100} />
      <Spacing height={20} />
      <TranslationsConsumer textKey="PAYMENT_FAILURE_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={20} />
      <TranslationsConsumer textKey="PAYMENT_FAILURE_BODY">
        {(text) => <Body>{text}</Body>}
      </TranslationsConsumer>
      <Spacing height={25} />
      <Button onPress={onPressContinue}>
        <TranslationsConsumer textKey="PAYMENT_FAILURE_BUTTON">
          {(text) => <ButtonText>{text}</ButtonText>}
        </TranslationsConsumer>
      </Button>
    </Container>
  );

import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';

import { colors, fonts } from '@hedviginsurance/brand';
import { Spacing } from '../../components/Spacing';
import { CircledCheckmark } from '../../components/icons/CircledCheckmark';
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
  color: colors.GREEN,
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

interface PaymentSuccessProps {
  onPressContinue: () => void;
}

export const PaymentSuccess: React.SFC<PaymentSuccessProps> = ({
  onPressContinue,
}) => (
    <Container>
      <CircledCheckmark height={100} width={100} />
      <Spacing height={20} />
      <TranslationsConsumer textKey="PAYMENT_SUCCESS_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={20} />
      <TranslationsConsumer textKey="PAYMENT_SUCCESS_BODY">
        {(text) => <Body>{text}</Body>}
      </TranslationsConsumer>
      <Spacing height={25} />
      <Button onPress={onPressContinue}>
        <TranslationsConsumer textKey="PAYMENT_SUCCESS_BUTTON">
          {(text) => <ButtonText>{text}</ButtonText>}
        </TranslationsConsumer>
      </Button>
    </Container>
  );

import * as React from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';
import styled from '@sampettersson/primitives';
import { CircledExclamationMark } from 'src/components/icons/CircledExclamationMark';
import { Spacing } from 'src/components/Spacing';
import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { PillButton } from 'src/components/PillButton';

import { Sequence, Delay, Spring } from 'animated-react-native-components';
import { AnimatedView } from 'src/components/AnimatedPrimitives';

const Container = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    height: '100%',
    width: Dimensions.get('window').width * 0.65,
    padding: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: animatedValue,
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 1],
        }),
      },
    ],
  }),
);

const ButtonContainer = styled(View)({
  width: '100%',
  height: 40,
});

const Message = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  textAlign: 'center',
});

interface ErrorMessageProps {
  retry: () => void;
  error: Boolean | undefined;
}

export const ErrorMessage: React.SFC<ErrorMessageProps> = ({
  error,
  retry,
}) => (
  <Sequence>
    <Delay config={{ delay: 350 }} />
    <Spring
      toValue={error ? 1 : 0}
      initialValue={0}
      config={{ bounciness: 12 }}
    >
      {(animatedValue) => (
        <Container animatedValue={animatedValue}>
          <CircledExclamationMark width={30} height={30} />
          <Spacing height={15} />
          <TranslationsConsumer textKey="FILE_UPLOAD_ERROR">
            {(text) => <Message>{text}</Message>}
          </TranslationsConsumer>
          <Spacing height={15} />
          <ButtonContainer>
            <PillButton text="Försök igen" onPress={() => retry()} />
          </ButtonContainer>
        </Container>
      )}
    </Spring>
  </Sequence>
);

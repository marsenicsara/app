import * as React from 'react';
import { Text, Dimensions, Animated } from 'react-native';
import styled from '@sampettersson/primitives';
import { CircledExclamationMark } from 'src/components/icons/CircledExclamationMark';
import { Spacing } from 'src/components/Spacing';
import { fonts, colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Sequence, Delay, Spring } from 'animated-react-native-components';
import { AnimatedView } from 'src/components/AnimatedPrimitives';

const Container = styled(AnimatedView)(
  ({
    animatedValue,
    error,
  }: {
    animatedValue: Animated.Value;
    error: boolean;
  }) => ({
    height: '100%',
    width: error ? Dimensions.get('window').width * 0.65 : 0,
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

const Message = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  textAlign: 'center',
});

interface ErrorMessageProps {
  error: boolean;
}

export const ErrorMessage: React.SFC<ErrorMessageProps> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Sequence>
      <Delay config={{ delay: 350 }} />
      <Spring
        toValue={error ? 1 : 0}
        initialValue={0}
        config={{ bounciness: 12 }}
      >
        {(animatedValue) => (
          <Container animatedValue={animatedValue} error={error}>
            <CircledExclamationMark width={30} height={30} />
            <Spacing height={15} />
            <TranslationsConsumer textKey="FILE_UPLOAD_ERROR">
              {(text) => <Message>{text}</Message>}
            </TranslationsConsumer>
          </Container>
        )}
      </Spring>
    </Sequence>
  );
};

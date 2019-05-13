import * as React from 'react';
import { Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import {
  Parallel,
  Timing,
  Sequence,
  Delay,
} from 'animated-react-native-components';

import { AnimatedView } from 'src/components/AnimatedPrimitives';
import { Loader } from 'src/components/Loader';
import { Delayed } from './Delayed';

const Button = styled(RectButton)({
  height: 40,
  borderRadius: 20,
  backgroundColor: 'white',
  borderWidth: 1,
  borderColor: colors.PURPLE,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonText = styled(Text)({
  color: colors.PURPLE,
  fontFamily: fonts.CIRCULAR,
  fontSize: 14,
});

const ContentContainer = styled(View)({
  position: 'absolute',
});

interface PillButtonProps {
  text: React.ReactNode;
  onPress: () => void;
  loading?: boolean;
}

export const PillButton: React.SFC<PillButtonProps> = ({
  text,
  onPress,
  loading,
}) => (
  <Button
    onPress={() => onPress()}
    underlayColor={colors.PURPLE}
    activeOpacity={0.2}
  >
    <ContentContainer>
      <Delayed
        mountChildren={!loading}
        mountChildrenAfter={0}
        unmountChildrenAfter={250}
      >
        <Sequence>
          <Delay config={{ delay: loading ? 0 : 150 }} />
          <Timing
            toValue={loading ? 0 : 1}
            initialValue={loading ? 0 : 1}
            config={{ duration: 150 }}
          >
            {(animatedValue) => (
              <AnimatedView style={{ opacity: animatedValue }}>
                <ButtonText>{text}</ButtonText>
              </AnimatedView>
            )}
          </Timing>
        </Sequence>
      </Delayed>
    </ContentContainer>
    <ContentContainer>
      <Delayed
        mountChildren={!!loading}
        mountChildrenAfter={0}
        unmountChildrenAfter={250}
      >
        <Sequence>
          <Delay config={{ delay: loading ? 150 : 0 }} />
          <Timing
            toValue={loading ? 1 : 0}
            initialValue={loading ? 1 : 0}
            config={{ duration: 150 }}
          >
            {(animatedValue) => (
              <AnimatedView style={{ opacity: animatedValue }}>
                <Loader size="small" />
              </AnimatedView>
            )}
          </Timing>
        </Sequence>
      </Delayed>
    </ContentContainer>
  </Button>
);

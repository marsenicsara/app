import React from 'react';
import Lottie from 'lottie-react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { Avatar } from '../types';
import { Timing, Sequence } from 'animated-react-native-components';
import { AnimatedView } from 'src/components/AnimatedPrimitives';

interface AnimationProps {
  width: number;
  height: number;
}

const Animation = styled(Lottie)(({ width, height }: AnimationProps) => ({
  backgroundColor: colors.TRANSPARENT,
  width,
  height,
}));

interface LoadingIndicatorProps {
  avatar: Avatar;
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps> = ({ avatar }) => {
  return avatar.data ? (
    <Sequence>
      <Timing toValue={1} initialValue={0} config={{ duration: 500 }}>
        {(animatedValue) => (
          <AnimatedView
            style={{
              opacity: animatedValue,
            }}
          >
            <Animation
              width={avatar.height}
              height={avatar.height}
              loop
              autoPlay
              source={avatar.data}
            />
          </AnimatedView>
        )}
      </Timing>
    </Sequence>
  ) : null;
};

export default LoadingIndicator;

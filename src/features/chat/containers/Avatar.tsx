import * as React from 'react';
import Lottie from 'lottie-react-native';
import { colors } from '@hedviginsurance/brand';
import { Avatar as AvatarType } from '../types';
import styled from '@sampettersson/primitives';

interface LottieAnimationProps {
  width: number;
  height: number;
}

const LottieAnimation = styled(Lottie)(
  ({ width, height }: LottieAnimationProps) => ({
    backgroundColor: colors.TRANSPARENT,
    width,
    height,
  }),
);

interface AvatarProps {
  avatar?: AvatarType;
}

const Avatar: React.SFC<AvatarProps> = ({ avatar }) =>
  avatar && avatar.data ? (
    <LottieAnimation
      width={avatar.width}
      height={avatar.height}
      source={avatar.data}
      autoPlay
      loop={false}
    />
  ) : null;

export default Avatar;

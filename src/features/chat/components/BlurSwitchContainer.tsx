import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, Platform } from 'react-native';
import { BlurView } from 'react-native-blur';

const BlurContainer = styled(BlurView)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
});

const ContainerAndroid = styled(View)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
});

export const BlurSwitchContainer: React.SFC = ({ children }) => {
  switch (Platform.OS) {
    case 'ios': {
      return <BlurContainer blurType="xlight">{children}</BlurContainer>;
    }
    case 'android': {
      return <ContainerAndroid>{children}</ContainerAndroid>;
    }
    default:
      throw new Error('invalid platform');
  }
};

import * as React from 'react';
import { Image, Platform } from 'react-native';
import styled from '@sampettersson/primitives';

const HedvigLogoImage = styled(Image)({
  width: 96,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
});

export const HedvigLogoTitle = () => (
  <HedvigLogoImage
    source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark.png')}
  />
);

import * as React from 'react';
import { Image, Platform } from 'react-native';
import styled from '@sampettersson/primitives';

const HedvigLogoImage = styled(Image)({
  hedvigLogo: {
    width: 96,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      android: {
        marginTop: 5,
      },
      ios: {},
    }),
  },
});

export const HedvigLogoTitle: React.SFC<{}> = () => (
  <HedvigLogoImage
    source={require('../../assets/identity/hedvig_wordmark/hedvig_wordmark.png')}
  />
);

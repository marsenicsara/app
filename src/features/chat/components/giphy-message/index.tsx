import * as React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import ProgressImage from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import styled from '@sampettersson/primitives';

import { GiphyPoweredBy } from '../GiphyPoweredBy';

interface GiphyMessageProps {
  url: string;
}

const MessageContainer = styled(View)({
  borderRadius: 20,
  overflow: 'hidden',
  marginBottom: 10,
});

const SizedProgressImage = styled(ProgressImage)({
  width: 280,
  height: 200,
});

export const GiphyMessage: React.SFC<GiphyMessageProps> = ({ url }) => (
  <MessageContainer>
    <SizedProgressImage
      source={{
        uri: url,
      }}
      indicator={Progress.CircleSnail}
      indicatorProps={{
        size: 40,
        thickness: 5,
        color: colors.PINK,
      }}
    />
    <GiphyPoweredBy />
  </MessageContainer>
);

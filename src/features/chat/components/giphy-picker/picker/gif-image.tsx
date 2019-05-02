import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View, TouchableOpacity, Image, Platform } from 'react-native';
import { colors } from '@hedviginsurance/brand';
//import FastImage from 'react-native-fast-image';

import { createImageProgress } from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import { GiphyPoweredBy } from '../../GiphyPoweredBy';

//const Image = Platform.OS === 'ios' ? createImageProgress(FastImage) : RNImage;

const Box = styled(View)({
  paddingLeft: 10,
  paddingBottom: 10,
  width: 250,
  height: 190,
  overflow: 'hidden',
});

const BorderRadius = styled(View)({
  borderRadius: 20,
  overflow: 'hidden',
  backgroundColor: colors.WHITE,
});

// @ts-ignore
const ImageContainer = styled(Image)({
  height: 140,
  width: '100%',
});

interface GifImageProps {
  url: string;
  onPress: () => void;
}

export const GifImage: React.SFC<GifImageProps> = ({ url, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Box>
      <BorderRadius>
        <ImageContainer
          indicator={Progress.CircleSnail}
          indicatorProps={{
            size: 40,
            thickness: 5,
            color: colors.PINK,
          }}
          source={{ uri: url }}
        />
        <GiphyPoweredBy />
      </BorderRadius>
    </Box>
  </TouchableOpacity>
);

import * as React from 'react';
import { View, Text } from 'react-native';
import { colors } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';

import { Giphy } from 'src/components/icons/Giphy';
import { Spacing } from 'src/components/Spacing';

const GiphyText = styled(Text)({
  marginTop: 1,
  fontSize: 12,
  fontFamily: 'Helvetica Neue',
  fontWeight: '500',
  color: colors.DARK_GRAY,
});

const PoweredBy = styled(View)({
  borderWidth: 1,
  borderTopWidth: 0,
  borderColor: colors.LIGHT_GRAY,
  flexDirection: 'row',
  alignItems: 'center',
  padding: 10,
  paddingLeft: 15,
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
});

export const GiphyPoweredBy = () => (
  <PoweredBy>
    <Giphy width={20} height={20} />
    <Spacing width={10} />
    <GiphyText>GIPHY</GiphyText>
  </PoweredBy>
);

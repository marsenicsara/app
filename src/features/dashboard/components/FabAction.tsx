import * as React from 'react';
import { View, Text, Platform, ViewStyle } from 'react-native';
import styled from '@sampettersson/primitives';

import { colors } from '@hedviginsurance/brand';

interface FabActionProps {
  enabled: boolean
  text: string
}

interface Disableable {
  enabled: boolean
}

const FabActionContainer = styled(View)(({ enabled }: Disableable) => ({
  zIndex: 5,
  backgroundColor: colors.WHITE,
  borderRadius: 24,
  borderWidth: 1,
  borderColor: enabled ? colors.PURPLE : '#d7d7dc',
  minHeight: 20,
  paddingTop: 10,
  paddingRight: 18,
  paddingBottom: 10,
  paddingLeft: 18,
  alignSelf: 'center',
  ...Platform.select<ViewStyle>({
    ios: {
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -64,
    },
  }),
}))


const FabText = styled(Text)(({ enabled }: Disableable) => ({
  color: enabled ? colors.PURPLE : '#d7d7dc'
}))

const FabAction: React.SFC<FabActionProps> = ({ enabled, text }) => (
  <FabActionContainer enabled={enabled}>
    <FabText enabled={enabled}>
      {text}
    </FabText>
  </FabActionContainer>
);

export default FabAction;

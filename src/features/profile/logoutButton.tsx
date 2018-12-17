import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

import { CircledLogout } from 'src/components/icons/CircledLogout';

const LOGOUT_TEXT = 'Logga ut';

const Button = styled(TouchableOpacity)({
  backgroundColor: 'white',
  padding: 20,
  paddingLeft: 15,
  paddingRight: 15,
  borderColor: colors.LIGHT_GRAY,
  borderTopWidth: StyleSheet.hairlineWidth,
  borderBottomWidth: StyleSheet.hairlineWidth,
});

const ButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  color: colors.OFF_BLACK,
  paddingLeft: 15,
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
});

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton: React.SFC<LogoutButtonProps> = ({ onPress }) => (
  <Button onPress={onPress}>
    <Row>
      <CircledLogout width={40} height={40} />
      <ButtonText>{LOGOUT_TEXT}</ButtonText>
    </Row>
  </Button>
);

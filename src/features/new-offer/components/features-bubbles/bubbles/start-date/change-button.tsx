import { TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import color from 'color';
import { Text } from 'react-native';

export const ChangeButton = styled(TouchableOpacity)({
  width: 56,
  height: 28,
  backgroundColor: color(colors.WHITE).alpha(0.8),
  borderRadius: 40,
  alignItems: 'center',
  justifyContent: 'center',
});

export const ChangeButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontSize: 13,
});

import { TouchableOpacity, StyleSheet } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import color from 'color';

export const PickerButton = styled(TouchableOpacity)({
  width: 110,
  height: 110,
  backgroundColor: color(colors.WHITE).alpha(0.8),
  borderRadius: 10,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: color(colors.DARK_GRAY).lighten(0.3),
});

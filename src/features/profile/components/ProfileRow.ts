import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import styled from '@sampettersson/primitives';

import { colors, fonts } from '@hedviginsurance/brand';

const ProfileRow = styled(View)({
  flexDirection: 'row',
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 16,
  alignItems: 'center',
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderTopWidth: StyleSheet.hairlineWidth,
  backgroundColor: colors.WHITE,
  borderColor: colors.LIGHT_GRAY,
  fontFamily: fonts.CIRCULAR
});
const TouchableProfileRow = ProfileRow.withComponent(TouchableOpacity)

const ProfileRowTextContainer = styled(View)({
  flex: 1,
  marginRight: 16,
  marginLeft: 16,
});

const ProfileRowHeader = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.OFF_BLACK,
  fontSize: 16,
});

const ProfileRowText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.DARK_GRAY,
  fontSize: 14,
});

export {
  ProfileRow,
  TouchableProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
};

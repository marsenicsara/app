import { View, Image, Text } from 'react-native';
import styled from '@sampettersson/primitives';

import { fonts, colors } from '@hedviginsurance/brand';

const Footnote = styled(View)({
  flexDirection: 'row',
});

const FootnoteIcon = styled(Image)({
  marginRight: 5,
  width: 16,
  height: 16,
});

const FootnoteText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.DARK_GRAY,
  fontSize: 14,
});

export { Footnote, FootnoteIcon, FootnoteText };

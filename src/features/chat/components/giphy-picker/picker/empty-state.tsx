import * as React from 'react';
import { Text, View, Dimensions } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Spacing } from 'src/components/Spacing';

const Box = styled(View)({
  padding: 10,
  height: '100%',
  width: Dimensions.get('window').width,
  alignItems: 'center',
  justifyContent: 'center',
});

const Emoji = styled(Text)({
  fontSize: 40,
  width: '100%',
  textAlign: 'center',
});

const EmptyText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 14,
  color: colors.DARK_GRAY,
});

interface EmptyStateProps {
  query: string;
}

export const EmptyState: React.SFC<EmptyStateProps> = ({ query }) => (
  <Box>
    <Emoji>{query ? '🙅‍♀️' : '👋'}</Emoji>
    <Spacing height={20} />
    <EmptyText>
      <TranslationsConsumer
        textKey={
          query ? 'CHAT_GIPHY_PICKER_NO_SEARCH_TEXT' : 'CHAT_GIPHY_PICKER_TEXT'
        }
      >
        {(text) => text}
      </TranslationsConsumer>
    </EmptyText>
  </Box>
);

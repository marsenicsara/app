import { View } from 'react-native';

import styled from '@sampettersson/primitives';

export const AnimationVisibility = styled(View)(
  ({ visible, useMargin }: { visible: boolean; useMargin?: boolean }) => ({
    marginBottom: useMargin && (visible ? 15 : 0),
    maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
    overflow: 'hidden',
  }),
);

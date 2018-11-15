import { View } from 'react-native';

import styled from '@sampettersson/primitives';

export const HeightConstraint = styled(View)(
  ({
    visible,
    useMargin,
    useWidth,
  }: {
    visible: boolean;
    useMargin?: boolean;
    useWidth?: boolean;
  }) => ({
    marginBottom: useMargin && (visible ? 15 : 0),
    maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
    width: useWidth && '100%',
    overflow: 'hidden',
  }),
);

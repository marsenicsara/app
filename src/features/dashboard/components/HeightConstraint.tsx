import { View } from 'react-native';
import styled from '@sampettersson/primitives';

export const HeightConstraint = styled(View)(
  ({ visible, useWidth }: { visible: boolean; useWidth?: boolean }) => ({
    marginBottom: 0,
    maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
    width: useWidth && '100%',
    overflow: 'hidden',
  }),
);

import { View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import styled from '@sampettersson/primitives';

export const HeightConstraint = styled(View)(
  ({
    visible,
    notificationMessage,
    useWidth,
  }: {
    visible: boolean;
    notificationMessage?: boolean;
    useWidth?: boolean;
  }) => ({
    marginBottom: notificationMessage && (visible ? 15 : 0),
    top: notificationMessage ? -getStatusBarHeight() : 0,
    maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
    width: useWidth && '100%',
    overflow: 'hidden',
  }),
);

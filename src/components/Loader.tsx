import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styled from '@sampettersson/primitives';

const LoaderView = styled(View)({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

interface LoaderProps {
  size?: number | 'small' | 'large' | undefined;
}

export const Loader: React.SFC<LoaderProps> = ({ size }) => (
  <LoaderView>
    <ActivityIndicator size={size || 'large'} color="#651EFF" />
  </LoaderView>
);

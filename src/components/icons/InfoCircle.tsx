import * as React from 'react';
import { Svg, Circle, G, Path } from 'react-native-svg';
import { IconSize } from './types';

export const InfoCircle: React.SFC<IconSize> = ({ height, width }) => (
  <Svg width={width} height={height} viewBox="0 0 16 16">
    <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G>
        <Circle stroke="#0F007A" cx="8" cy="8" r="7.5" />
        <Path
          d="M8.558,12 L8.558,6.228 L7.442,6.228 L7.442,12 L8.558,12 Z M7.19,4.044 C7.19,4.488 7.55,4.848 7.994,4.848 C8.45,4.848 8.81,4.488 8.81,4.044 C8.81,3.588 8.45,3.228 7.994,3.228 C7.55,3.228 7.19,3.588 7.19,4.044 Z"
          id="i"
          fill="#0F007A"
        />
      </G>
    </G>
  </Svg>
);

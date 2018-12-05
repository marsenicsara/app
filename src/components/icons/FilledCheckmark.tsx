import * as React from 'react';
import { Svg, Circle, G, Polygon } from 'react-native-svg';
import { IconSize } from './types';

interface CircledCrossProps extends IconSize {
  checkmarkLineColor?: string;
}

export const FilledCircledCheckmark: React.SFC<CircledCrossProps> = ({
  height,
  width,
  checkmarkLineColor,
}) => (
  <Svg width={width} height={height} viewBox="0 0 16 16">
    <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G>
        <Circle fill="#1BE9B6" cx="8" cy="8" r="8" />
        <Polygon
          fill={checkmarkLineColor}
          points="6.43093546 10.2144366 4.21768553 7.97634489 3.46666667 8.73579327 6.43093546 11.7333333 12.8 5.29278171 12.0489811 4.53333333"
        />
      </G>
    </G>
  </Svg>
);

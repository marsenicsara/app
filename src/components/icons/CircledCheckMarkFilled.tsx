import * as React from 'react';
import { Svg, Circle, G, Polygon } from 'react-native-svg';

import { colors } from '@hedviginsurance/brand';
import { IconSize } from './types';

export const CircledCheckmarkFilled: React.SFC<IconSize> = ({
  height,
  width,
}) => (
  <Svg width={width} height={height}>
    <G
      id="Symbols"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <G id="icons/my_insurance/aktiv">
        <Circle id="Oval" fill="#1BE9B6" cx="8" cy="8" r="8" />
        <Polygon
          id="Page-1"
          fill={colors.WHITE}
          points="6.43093546 10.2144366 4.21768553 7.97634489 3.46666667 8.73579327 6.43093546 11.7333333 12.8 5.29278171 12.0489811 4.53333333"
        />
      </G>
    </G>
  </Svg>
);

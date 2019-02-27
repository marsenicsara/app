import * as React from 'react';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { Navigation } from 'react-native-navigation';

const OverlayContent = styled(View)({
  paddingLeft: 30,
  paddingRight: 30,
});

const Row = styled(View)({
  flexDirection: 'row',
});

const Heading = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontSize: 15,
  fontWeight: '600',
});

interface ChangeOverlayProps {
  componentId: string;
}

export const ChangeOverlay: React.SFC<ChangeOverlayProps> = ({
  componentId,
}) => (
  <DraggableOverlay
    heightPercentage={
      ((isIphoneX() ? 125 : 100) / Dimensions.get('window').height) * 100
    }
    onClose={() => Navigation.dismissOverlay(componentId)}
  >
    {(handleClose) => (
      <>
        <OverlayContent>
          <Heading>Ändra</Heading>
        </OverlayContent>
      </>
    )}
  </DraggableOverlay>
);

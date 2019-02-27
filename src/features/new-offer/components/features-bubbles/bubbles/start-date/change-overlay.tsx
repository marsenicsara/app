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
import { Header } from 'src/components/draggable-overlay/header';
import { Spacing } from 'src/components/Spacing';
import DatePicker from 'react-native-date-picker';

const OverlayContent = styled(View)({
  justifyContent: 'center',
});

const Row = styled(View)({
  alignItems: 'center',
});

const Heading = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.OFF_BLACK,
  fontSize: 16,
  lineHeight: 20,
  fontWeight: '500',
  textAlign: 'center',
  padding: 24,
});

const StartDatePicker = styled(DatePicker)({
  borderTopWidth: 1,
  borderTopColor: colors.LIGHT_GRAY,
  borderBottomWidth: 1,
  borderBottomColor: colors.LIGHT_GRAY,
});

const ConfirmButton = styled(TouchableOpacity)({
  width: 146,
  height: 50,
  backgroundColor: colors.PURPLE,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
});

const ConfirmButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.WHITE,
  fontSize: 17,
  lineHeight: 22,
});

const ResetButton = styled(TouchableOpacity)({
  width: 200,
  height: 32,
  backgroundColor: colors.LIGHT_GRAY,
  borderRadius: 24,
  alignItems: 'center',
  justifyContent: 'center',
});

const ResetButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.OFF_BLACK_DARK,
  fontSize: 14,
  lineHeight: 20,
});

interface ChangeOverlayProps {
  componentId: string;
}

export const ChangeOverlay: React.SFC<ChangeOverlayProps> = ({
  componentId,
}) => (
  <DraggableOverlay
    heightPercentage={70}
    onClose={() => Navigation.dismissOverlay(componentId)}
  >
    {(handleClose) => (
      <>
        <Header
          title={'Ändra startdatum'}
          onCloseClick={handleClose}
          restartButton={false}
          backgroundColor={colors.OFF_WHITE}
          textColor={colors.OFF_BLACK_DARK}
          buttonColor={colors.DARK_GRAY}
        />
        <OverlayContent>
          <Heading>
            Vilket datum vill du att din hemförsäkring ska aktiveras?
          </Heading>
          <StartDatePicker date={new Date()} />
          <Spacing height={40} />
          <Row>
            <ConfirmButton>
              <ConfirmButtonText>Välj datum</ConfirmButtonText>
            </ConfirmButton>
          </Row>
          <Spacing height={22} />
          <Row>
            <ResetButton>
              <ResetButtonText>När min bindningstid går ut</ResetButtonText>
            </ResetButton>
          </Row>
        </OverlayContent>
      </>
    )}
  </DraggableOverlay>
);

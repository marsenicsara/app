import * as React from 'react';
import styled from '@sampettersson/primitives';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import Color from 'color';
import { Delay, Timing, Sequence } from 'animated-react-native-components';
import { ConsumerProps } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';
import { MessageHeightAnimation } from './MessageHeightAnimation';
import { AnimatedView } from 'src/components/AnimatedPrimitives';
import { Measure } from 'src/components/Measure';

export enum MessageType {
  ERROR = 'error',
  WARNING = 'warning',
  NOTIFY = 'notify',
}

const messageTypeColors = {
  [MessageType.ERROR]: colors.PINK,
  [MessageType.WARNING]: colors.PURPLE,
  [MessageType.NOTIFY]: colors.GREEN,
};

const messageTypeTextColors = {
  [MessageType.ERROR]: colors.WHITE,
  [MessageType.WARNING]: colors.WHITE,
  [MessageType.NOTIFY]: colors.BLACK,
};

const MessageContainer = styled(View)(({ height }: { height: number }) => ({
  padding: 15,
  alignItems: 'center',
  height: height ? height : 'auto',
}));

const Background = styled(View)(
  ({ messageType }: { messageType: MessageType }) => ({
    backgroundColor: messageTypeColors[messageType],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Color(messageTypeColors[messageType])
      .darken(0.3)
      .rgb()
      .toString(),
  }),
);

const MessageText = styled(Text)(
  ({ messageType }: { messageType: MessageType }) => ({
    color: messageTypeTextColors[messageType],
    fontFamily: fonts.CIRCULAR,
    fontSize: 14,
    maxWidth: 280,
    textAlign: 'center',
  }),
);

const ActionButton = styled(TouchableOpacity)(
  ({ messageType }: { messageType: MessageType }) => ({
    backgroundColor: Color(messageTypeColors[messageType])
      .darken(0.45)
      .rgb()
      .toString(),
    padding: 5,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
  }),
);

const ActionButtonText = styled(Text)({
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
  fontSize: 14,
});

const FadeIn = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
  }),
);

interface MessageProps {
  message: String | React.ReactElement<ConsumerProps>;
  messageType: MessageType;
  action: String | React.ReactElement<ConsumerProps>;
  onPressAction: () => void;
  visible: boolean;
}

export const Message: React.SFC<MessageProps> = ({
  messageType,
  message,
  action,
  onPressAction,
  visible,
}) => (
  <MessageHeightAnimation visible={visible} notificationMessage={true}>
    <Background messageType={messageType}>
      <Sequence>
        <Delay config={{ delay: 400 }} />
        <Timing initialValue={0} toValue={1} config={{ duration: 250 }}>
          {(animatedValue) => (
            <FadeIn animatedValue={animatedValue}>
              <Measure>
                {(height) => (
                  <MessageContainer height={height}>
                    <MessageText messageType={messageType}>
                      {message}
                    </MessageText>
                    <Spacing height={15} />
                    <ActionButton
                      messageType={messageType}
                      onPress={onPressAction}
                    >
                      <ActionButtonText>{action}</ActionButtonText>
                    </ActionButton>
                  </MessageContainer>
                )}
              </Measure>
            </FadeIn>
          )}
        </Timing>
      </Sequence>
    </Background>
  </MessageHeightAnimation>
);

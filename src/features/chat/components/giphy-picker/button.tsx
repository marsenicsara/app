import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  View,
  Text,
  ViewProps,
} from 'react-native';
import { Consumer } from './context';
import styled from '@sampettersson/primitives';
import { colors } from '@hedviginsurance/brand';
import { Parallel, Timing } from 'animated-react-native-components';
import { Plus } from 'src/components/icons/Plus';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const Button = styled(TouchableOpacity)({
  width: 40,
  height: 40,
  backgroundColor: colors.PURPLE,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
});

const GIFTextContainer = styled(AnimatedView)({
  position: 'absolute',
});

const GIFText = styled(Text)({
  fontFamily: 'Helvetica',
  fontSize: 13,
  color: colors.WHITE,
});

const PlusContainer = styled(AnimatedView)({
  position: 'absolute',
});

const Relative = styled(View)({
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: 10,
});

export const GiphyButton = () => (
  <Consumer>
    {({ setIsOpen, isOpen }) => (
      <Parallel>
        <Timing
          toValue={isOpen ? 1 : 0}
          initialValue={isOpen ? 1 : 0}
          config={{ duration: 250 }}
        >
          {(animatedValue) => (
            <Relative>
              <Button onPress={() => setIsOpen(!isOpen)}>
                <GIFTextContainer
                  style={{
                    opacity: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0],
                    }),
                  }}
                >
                  <TranslationsConsumer textKey="GIF_BUTTON_TITLE">
                    {(text) => <GIFText>{text}</GIFText>}
                  </TranslationsConsumer>
                </GIFTextContainer>
                <PlusContainer
                  style={{
                    opacity: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }),
                  }}
                >
                  <View style={{ transform: [{ rotate: '45deg' }] }}>
                    <Plus width={35} height={35} />
                  </View>
                </PlusContainer>
              </Button>
            </Relative>
          )}
        </Timing>
      </Parallel>
    )}
  </Consumer>
);

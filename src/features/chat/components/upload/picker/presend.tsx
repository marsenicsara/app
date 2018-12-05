import * as React from 'react';
import { BlurView } from 'react-native-blur';
import styled from '@sampettersson/primitives';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ViewProps,
  View,
  Text,
  Platform
} from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import { Container, ActionMap } from 'constate';
import {
  Parallel,
  Timing,
  Spring,
  Sequence,
  Delay,
} from 'animated-react-native-components';
import { Delayed } from 'src/components/Delayed';
import { UploadingAnimation } from './uploading-animation';
import { Update } from 'react-lifecycle-components';

interface State {
  isVisible: boolean;
}

interface Actions {
  setIsVisible: (isVisible: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setIsVisible: (isVisible) => () => ({
    isVisible,
  }),
};

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const SendButton = styled(TouchableOpacity)({
  height: 40,
  width: 150,
  backgroundColor: colors.GREEN,
  borderRadius: 20,
  alignItems: 'center',
  justifyContent: 'center',
});

const FullSizeIOS = styled(BlurView)({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const FullSizeAndroid = styled(View)({
  width: '100%',
  height: '100%',
  backgroundColor: colors.TRANSPARENT,
  alignItems: 'center',
  justifyContent: 'center'
})

const FullSize: React.SFC<{ blurType: string }> = ({ blurType, children }) => (
  Platform.OS === 'android' ? (
    <FullSizeAndroid>{children}</FullSizeAndroid>
  ) : (
      <FullSizeIOS blurType={blurType}>{children}</FullSizeIOS>
    )
)

const FadeInView = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
    position: 'absolute',
    width: '100%',
    height: '100%',
  }),
);

const ButtonAnimation = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue.interpolate({
      inputRange: [-200, 0],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateY: animatedValue,
      },
    ],
  }),
);

const SendButtonText = styled(Text)({
  fontSize: 15,
  color: colors.WHITE,
  fontFamily: fonts.CIRCULAR,
});

interface PresendProps {
  children: (showPresendOverlay: () => void) => React.ReactNode;
  onPressSend: () => void;
  isUploading: boolean;
}

export const Presend: React.SFC<PresendProps> = ({
  children,
  onPressSend,
  isUploading,
}) => (
    <Container actions={actions} initialState={{ isVisible: false }}>
      {({ isVisible, setIsVisible }) => (
        <>
          <Update
            watched={isUploading}
            was={() => {
              if (!isUploading) {
                setIsVisible(false);
              }
            }}
          >
            {null}
          </Update>
          {children(() => {
            setIsVisible(true);
          })}
          <Delayed
            mountChildren={isVisible}
            mountChildrenAfter={0}
            unmountChildrenAfter={300}
          >
            <Parallel>
              <Timing
                toValue={isVisible ? 1 : 0}
                initialValue={0}
                config={{ duration: 250 }}
              >
                {(animatedValue) => (
                  <FadeInView animatedValue={animatedValue}>
                    <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                      <FullSize blurType="dark">
                        <Sequence>
                          <Delay config={{ delay: 150 }} />
                          <Spring
                            toValue={0}
                            initialValue={-200}
                            config={{ bounciness: 7 }}
                          >
                            {(animatedValue) => (
                              <ButtonAnimation animatedValue={animatedValue}>
                                <UploadingAnimation isUploading={isUploading}>
                                  <SendButton onPress={() => onPressSend()}>
                                    <View>
                                      <SendButtonText>Skicka</SendButtonText>
                                    </View>
                                  </SendButton>
                                </UploadingAnimation>
                              </ButtonAnimation>
                            )}
                          </Spring>
                        </Sequence>
                      </FullSize>
                    </TouchableWithoutFeedback>
                  </FadeInView>
                )}
              </Timing>
            </Parallel>
          </Delayed>
        </>
      )}
    </Container>
  );

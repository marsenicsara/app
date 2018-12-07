import * as React from 'react';
import { View, Text, Animated, ViewProps } from 'react-native';
import styled from '@sampettersson/primitives';
import { Parallel, Spring } from 'animated-react-native-components';
import * as Progress from 'react-native-progress';
import { fonts, colors } from '@hedviginsurance/brand';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';
const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const AnimationContainer = styled(View)({
  position: 'relative',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled(AnimatedView)({});

const Spinner = styled(AnimatedView)({
  position: 'absolute',
});

const SpinnerText = styled(Text)(({ darkMode }: { darkMode: boolean }) => ({
  fontFamily: fonts.CIRCULAR,
  color: darkMode ? colors.BLACK : colors.WHITE,
  fontSize: 12,
}));

interface UploadingAnimationProps {
  isUploading: boolean;
  darkMode?: boolean;
}

export const UploadingAnimation: React.SFC<UploadingAnimationProps> = ({
  isUploading,
  children,
  darkMode,
}) => (
  <AnimationContainer>
    <Parallel>
      <Spring
        toValue={isUploading ? 1 : 0}
        initialValue={0}
        config={{ bounciness: 5 }}
      >
        {(animatedValue) => (
          <>
            {isUploading && (
              <Spinner
                style={{
                  opacity: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <View style={{ width: 40, height: 40 }}>
                  <Progress.CircleSnail
                    animating={isUploading}
                    color={darkMode ? colors.BLACK : colors.WHITE}
                  />
                </View>
                <Spacing height={5} />
                <TranslationsConsumer textKey="CHAT_UPLOADING_ANIMATION_TEXT">
                  {(text) => (
                    <SpinnerText darkMode={darkMode}>{text}</SpinnerText>
                  )}
                </TranslationsConsumer>
              </Spinner>
            )}
            <Content
              style={{
                opacity: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              }}
            >
              {children}
            </Content>
          </>
        )}
      </Spring>
    </Parallel>
  </AnimationContainer>
);

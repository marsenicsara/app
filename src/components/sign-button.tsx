import * as React from 'react';
import styled from '@sampettersson/primitives';
import {
  TouchableOpacity,
  ViewProps,
  Animated,
  View,
  Text,
  Platform,
} from 'react-native';
import { BankID } from 'src/components/icons/BankID';
import { NavigationEvents } from 'src/navigation/events';
import { Delay, Timing, Sequence } from 'animated-react-native-components';
import { Container, ActionMap } from 'constate';
import { fonts, colors } from '@hedviginsurance/brand';
import { AndroidOfferState } from 'src/features/new-offer/components/android-offer-state';
import { Update } from 'react-lifecycle-components';
import { TranslationsConsumer } from './translations/consumer';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const ButtonViewContainer = styled(View)(
  Platform.select({
    ios: {},
    android: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  }),
);

const ButtonContainer = styled(TouchableOpacity)({
  width: 80,
  height: 30,
  borderRadius: 20,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
});

const TextContainer = styled(Text)({
  fontSize: 10,
  paddingRight: 5,
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
});

const FadeInView = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
  }),
);

interface State {
  show: boolean;
}

interface Actions {
  setShow: (show: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setShow: (show) => () => ({
    show,
  }),
};

const ButtonView: React.SFC<{ onClick: () => void }> = ({ onClick }) => (
  <ButtonContainer
    onPress={onClick}
  >
    <TranslationsConsumer textKey={"OFFER_BANKID_SIGN_BUTTON"}>
      {(text) => (
        <TextContainer>
          {text}
        </TextContainer>
      )}
    </TranslationsConsumer>
    <BankID width={15} height={15} />
  </ButtonContainer>
)

export const SignButton: React.SFC = () => (
  <ButtonViewContainer>
    <Container actions={actions} initialState={{ show: true }}>
      {({ show, setShow }) => (
        <Sequence>
          <Delay config={{ delay: 500 }} />
          <Timing
            toValue={show ? 1 : 0}
            initialValue={0}
            config={{ duration: 250 }}
          >
            {(animatedValue) => (
              <FadeInView
                pointerEvents={show ? 'auto' : 'none'}
                animatedValue={animatedValue}
              >
                {Platform.OS === 'ios' ? (
                  <NavigationEvents
                    onGlobalEvent={(event: { id: string }) => {
                      if (event.id === 'HideSignButton') {
                        setShow(false);
                      } else if (event.id === 'ShowSignButton') {
                        setShow(true);
                      }
                    }}
                  >
                    {(triggerEvent: (event: { id: string }) => void) => (
                      <ButtonView onClick={() => triggerEvent({ id: 'SignButtonPressed' })} />
                    )}
                  </NavigationEvents>) : (
                    <AndroidOfferState>
                      {({ setIsCheckingOut, topSignButtonVisible }) => (
                        <Update<boolean>
                          was={() => {
                            if (topSignButtonVisible) {
                              setShow(true)
                            } else {
                              setShow(false)
                            }
                          }}
                          watched={topSignButtonVisible}
                        >
                          <ButtonView onClick={() => setIsCheckingOut(true)} />
                        </Update>
                      )}
                    </AndroidOfferState>
                  )}
              </FadeInView>
            )}
          </Timing>
        </Sequence>
      )}
    </Container>
  </ButtonViewContainer>
);

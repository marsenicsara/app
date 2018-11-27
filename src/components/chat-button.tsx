import * as React from 'react';
import {
  TouchableOpacity,
  Platform,
  View,
  ViewProps,
  Animated,
} from 'react-native';
import { Container, ActionMap } from 'constate';
import styled from '@sampettersson/primitives';
import { Sequence, Delay, Timing } from 'animated-react-native-components';
import { Navigation } from 'react-native-navigation';

import { SpeechBubbles } from 'src/components/icons/SpeechBubbles';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import { Header } from 'src/components/draggable-overlay/header';
import OfferChat from 'src/features/chat/OfferChat';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { CHAT_SCREEN } from 'src/navigation/screens/chat';

const AnimatedView = Animated.createAnimatedComponent<ViewProps>(View);

const ChatButtonContainer = styled(View)(
  Platform.select({
    ios: {},
    android: {
      paddingRight: 10,
      paddingLeft: 10,
    },
  }),
);

interface State {
  open: boolean;
}

interface Actions {
  setOpen: (open: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setOpen: (open) => () => ({
    open,
  }),
};

const OFFER_CLOSED_MUTATION = gql`
  mutation OfferClosed {
    offerClosed
  }
`;

export const ChatButton: React.SFC = () => (
  <ChatButtonContainer>
    <Container actions={actions} initialState={{ open: false }}>
      {({ open, setOpen }) => (
        <Mutation mutation={OFFER_CLOSED_MUTATION}>
          {(mutate) => (
            <>
              <Sequence>
                <Delay config={{ delay: 500 }} />
                <Timing toValue={1} initialValue={0} config={{ duration: 250 }}>
                  {(animatedValue) => (
                    <AnimatedView style={{ opacity: animatedValue }}>
                      <TouchableOpacity
                        onPress={() => {
                          mutate().then(() => {
                            if (Platform.OS === 'android') {
                              Navigation.showModal({
                                stack: {
                                  children: [CHAT_SCREEN],
                                },
                              });
                            } else {
                              setOpen(true);
                            }
                          });
                        }}
                      >
                        <SpeechBubbles height={25} width={25} />
                      </TouchableOpacity>
                    </AnimatedView>
                  )}
                </Timing>
              </Sequence>
              {open && (
                <DraggableOverlay
                  heightPercentage={90}
                  onClose={() => setOpen(false)}
                >
                  {(handleClose) => (
                    <>
                      <TranslationsConsumer textKey="OFFER_CHAT_HEADER">
                        {(text) => (
                          <Header
                            title={text}
                            onCloseClick={handleClose}
                            restartButton={true}
                          />
                        )}
                      </TranslationsConsumer>
                      <OfferChat onRequestClose={handleClose} />
                    </>
                  )}
                </DraggableOverlay>
              )}
            </>
          )}
        </Mutation>
      )}
    </Container>
  </ChatButtonContainer>
);

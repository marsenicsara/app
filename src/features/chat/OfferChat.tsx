import * as React from 'react';
import { connect } from 'react-redux';
import { View, AppState, KeyboardAvoidingView, Platform } from 'react-native';
import styled from '@sampettersson/primitives';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { Mount, Update, Unmount } from 'react-lifecycle-components';
import { Container, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';

import Dialog from 'src/containers/Dialog';

import { Message } from './types';
import { InputHeightContainer } from './containers/InputHeight';
import { KeyboardAvoidingOnAndroid } from 'src/components/KeyboardAvoidingOnAndroid';

interface ChatProps {
  onboardingDone: boolean;
  intent: string;
  messages: Array<Message>;
  getAvatars: () => void;
  getMessages: (intent: string) => void;
  onRequestClose: () => void;
}

interface State {
  longPollTimeout: number | null;
}

const initialState: State = {
  longPollTimeout: null,
};

interface Effects {
  startPolling: (
    getMessages: ((intent: string) => void),
    intent: string,
  ) => void;
  stopPolling: () => void;
}

const effects: EffectMap<State, Effects> = {
  startPolling: (getMessages, intent) => ({
    setState,
    state,
  }: EffectProps<State>) => {
    if (!state.longPollTimeout) {
      setState((state: any) => ({
        longPollTimeout: setInterval(() => {
          getMessages(intent);
        }, 15000),
      }));
    }
  },
  stopPolling: () => ({ setState, state }: EffectProps<State>) => {
    if (state.longPollTimeout) {
      clearInterval(state.longPollTimeout);
      setState((state: any) => ({
        longPollTimeout: null,
      }));
    }
  },
};

const KeyboardAvoid = styled(KeyboardAvoidingView)({
  flex: 1,
  ...ifIphoneX(
    {
      marginBottom: 20,
    },
    {
      marginBottom: 0,
    },
  ),
});

const Messages = styled(View)({
  flex: 1,
  alignSelf: 'stretch',
  paddingLeft: 16,
  paddingRight: 16,
});

const Response = styled(View)({
  alignItems: 'stretch',
  paddingTop: 8,
});

const handleAppStateChange = (
  appState: string,
  getMessages: (intent: string) => void,
  intent: string,
) => {
  if (appState === 'active') {
    getMessages(intent);
  }
};

const showOffer = (stopPolling: () => void, onRequestClose: () => void) => {
  stopPolling();
  onRequestClose();
};


const Chat: React.SFC<ChatProps> = ({
  intent,
  messages,
  getAvatars,
  getMessages,
  onRequestClose,
}) => (
    <Container effects={effects} initialState={initialState}>
      {({ startPolling, stopPolling }) => (
        <>
          <Mount
            on={() => {
              getMessages(intent);
              getAvatars();
              AppState.addEventListener('change', (appState) => {
                handleAppStateChange(appState, getMessages, intent);
              });
              startPolling(getMessages, intent);
            }}
          >
            {null}
          </Mount>
          <Update
            was={() => {
              startPolling(getMessages, intent);
            }}
            watched={messages}
          >
            {null}
          </Update>
          <Unmount
            on={() => {
              AppState.addEventListener('change', (appState) => {
                handleAppStateChange(appState, getMessages, intent);
              });
              stopPolling();
            }}
          >
            {null}
          </Unmount>
          <KeyboardAvoidingOnAndroid additionalPadding={8}>
            <Messages>
              {messages.length ? (
                <MessageList
                  showOffer={() => showOffer(stopPolling, onRequestClose)}
                />
              ) : (
                  <Loader />
                )}
            </Messages>
            <Response>
              <InputComponent
                messages={messages}
                showOffer={() => showOffer(stopPolling, onRequestClose)}
              />
            </Response>
            <Dialog />
          </KeyboardAvoidingOnAndroid>
        </>
      )}
    </Container>
  );

const mapStateToProps = (state: any) => {
  return {
    messages: state.chat.messages,
    showReturnToOfferButton: selectors.shouldShowReturnToOfferScreenButton(
      state,
    ),
    intent: state.conversation.intent,
    onboardingDone: selectors.isOnboardingDone(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMessages: (intent: null | string) =>
      dispatch(
        chatActions.getMessages({
          intent,
        }),
      ),
    getAvatars: () => dispatch(chatActions.getAvatars()),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
export { Chat as PureOfferChat };

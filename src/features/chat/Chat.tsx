import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, AppState } from 'react-native';
import styled from '@sampettersson/primitives';
import { Mount, Update, Unmount } from 'react-lifecycle-components';
import { Container, ActionMap, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';
import { NavigationOptions } from '../../navigation/options';
import { NavigationEvents } from 'src/navigation/events';
import { getMainLayout } from 'src/navigation/layouts/mainLayout';
import { setLayout } from 'src/navigation/layouts/setLayout';
import {
  getOfferScreen,
  OFFER_GROUPS,
} from 'src/navigation/screens/offer/ab-test';
import {
  RESTART_BUTTON,
  CLOSE_BUTTON,
  GO_TO_DASHBOARD_BUTTON,
  SHOW_OFFER_BUTTON,
} from '../../navigation/screens/chat/buttons';

import { Avatar, Choice, Message } from './types';

import { Query } from 'react-apollo';
import { MESSAGE_QUERY } from './chat-query';
import { MESSAGE_SUBSCRIPTION } from './chat-subscription';
import { KeyboardAvoidingOnAndroid } from 'src/components/KeyboardAvoidingOnAndroid';
import { BackButton } from 'src/components/BackButton';
import { Text } from 'react-native';

interface ChatProps {
  onboardingDone: boolean;
  isModal: boolean;
  showReturnToOfferButton: boolean;
  componentId: string;
  intent: string;
  messages: Array<Message>;
  getMessages: (intent: string) => void;
  resetConversation: () => void;
}

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

const getNavigationOptions = (
  onboardingDone: boolean,
  isModal: boolean,
  showReturnToOfferButton: boolean,
) => {
  if (onboardingDone) {
    if (isModal) {
      return {
        topBar: {
          leftButtons: [CLOSE_BUTTON],
          rightButtons: [],
        },
      };
    }

    return {
      topBar: {
        leftButtons: [GO_TO_DASHBOARD_BUTTON],
        rightButtons: [],
      },
    };
  } else if (showReturnToOfferButton) {
    return {
      topBar: {
        leftButtons: [],
        rightButtons: [SHOW_OFFER_BUTTON],
      },
    };
  } else {
    return {
      topBar: {
        leftButtons: [],
        rightButtons: [RESTART_BUTTON],
      },
    };
  }
};

const showOffer = async (componentId: string) => {
  const { screen, group } = await getOfferScreen();

  if (group === OFFER_GROUPS.OLD) {
    Navigation.showModal({
      stack: {
        children: [screen],
      },
    });
  } else {
    Navigation.push(componentId, screen);
  }
};

const handleAppStateChange = (
  appState: string,
  getMessages: (intent: string) => void,
  intent: string,
) => {
  if (appState === 'active') {
    getMessages(intent);
  }
};

interface State {
  messages: Message[];
  avatars: Avatar[];
  displayLoadingIndicator: boolean;
  stackedInterval: number;
}

interface Actions {
  setMessages: (messages: Message[]) => void;
  selectChoice: (message: Message, choice: Choice) => void;
}

const actions: ActionMap<State, Actions> = {
  setMessages: (messages) => () => ({
    messages,
  }),
  selectChoice: (message, choice) => (state) => {
    const messages = state.messages;

    const messageIndex = messages.findIndex(
      (m) => m.globalId === message.globalId,
    );

    const choiceIndex = messages[messageIndex].body.choices.findIndex((c) =>
      Object.is(c, choice),
    );

    const currentSelection =
      messages[messageIndex].body.choices[choiceIndex].selected;

    messages[messageIndex].body.choices[
      choiceIndex
    ].selected = !currentSelection;

    return { messages };
  },
};
const KeyboardAvoidingOnAndroidIfModal: React.SFC<{ isModal: boolean }> = ({
  children,
  isModal,
}) =>
  isModal ? (
    <KeyboardAvoidingOnAndroid additionalPadding={16}>
      {children}
    </KeyboardAvoidingOnAndroid>
  ) : (
    <>{children}</>
  );

interface Effects {
  addToChat: (messages: any, delay: any) => void;
}

const effects: EffectMap<State, Effects> = {
  addToChat: (messages: any, delay: any) => ({
    setState,
    state,
  }: EffectProps<State>) => {
    if (state.stackedInterval === 0) {
      setState((state: any) => ({
        messages,
        stackedInterval: state.stackedInterval + delay,
      }));
      setTimeout(() => {
        setState((state: any) => ({
          stackedInterval: state.stackedInterval - delay,
        }));
      }, state.stackedInterval + delay);
    } else {
      setState((state: any) => ({
        stackedInterval: state.stackedInterval + delay,
      }));

      setTimeout(() => {
        setState((state: any) => ({
          messages,
          stackedInterval: state.stackedInterval - delay,
        }));
      }, state.stackedInterval + delay);
    }
  },
};

const Chat: React.SFC<ChatProps> = ({
  onboardingDone = false,
  isModal,
  showReturnToOfferButton,
  componentId,
  intent,
  getMessages,
  resetConversation,
}) => (
  <Query query={MESSAGE_QUERY} fetchPolicy="network-only">
    {({ loading, error, data, subscribeToMore }) =>
      !loading && !error && data ? (
        <Container
          actions={actions}
          effects={effects}
          initialState={{
            messages: data.messages,
            avatars: data.avatars,
            displayLoadingIndicator: false,
            stackedInterval: 0,
          }}
        >
          {({
            messages,
            avatars,
            selectChoice,
            setMessages,
            addToChat,
            stackedInterval,
          }) => (
            <>
              <NavigationEvents
                onNavigationButtonPressed={(event: any) => {
                  if (event.buttonId === RESTART_BUTTON.id) {
                    resetConversation();
                  }

                  if (event.buttonId === CLOSE_BUTTON.id) {
                    Navigation.dismissModal(componentId);
                  }

                  if (event.buttonId === GO_TO_DASHBOARD_BUTTON.id) {
                    setLayout(getMainLayout());
                  }

                  if (event.buttonId === SHOW_OFFER_BUTTON.id) {
                    showOffer(componentId);
                  }
                }}
              />
              <Mount
                on={() => {
                  AppState.addEventListener('change', (appState) => {
                    handleAppStateChange(appState, getMessages, intent);
                  });

                  subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;

                      const newMessage = subscriptionData.data.message;

                      const updatedMessages = Object.assign({}, prev, {
                        messages: [newMessage, ...prev.messages],
                      });

                      const delay = newMessage.header.pollingInterval || 0;
                      addToChat(updatedMessages.messages, delay);

                      return updatedMessages;
                    },
                    onError: (err) => console.log(err),
                  });
                }}
              >
                {null}
              </Mount>
              <Update was={() => {}} watched={messages}>
                {null}
              </Update>
              <Unmount
                on={() => {
                  AppState.addEventListener('change', (appState) => {
                    handleAppStateChange(appState, getMessages, intent);
                  });
                }}
              >
                {null}
              </Unmount>

              <NavigationOptions
                options={getNavigationOptions(
                  onboardingDone,
                  isModal,
                  showReturnToOfferButton,
                )}
              >
                <KeyboardAvoidingOnAndroidIfModal isModal={isModal}>
                  <Messages>
                    <MessageList
                      messages={messages}
                      avatars={avatars}
                      displayLoadingIndicator={stackedInterval !== 0}
                    />
                  </Messages>

                  <Response>
                    <InputComponent
                      showOffer={() => showOffer(componentId)}
                      selectChoice={selectChoice}
                      messages={messages}
                    />
                  </Response>
                </KeyboardAvoidingOnAndroidIfModal>
              </NavigationOptions>
            </>
          )}
        </Container>
      ) : (
        <Loader />
      )
    }
  </Query>
);

const mapStateToProps = (state: any) => {
  return {
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
    resetConversation: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Vill du börja om?',
          paragraph:
            'Om du trycker ja så börjar\nkonversationen om från början',
          confirmButtonTitle: 'Ja',
          dismissButtonTitle: 'Nej',
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () => {},
        }),
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
export { Chat as PureChat };

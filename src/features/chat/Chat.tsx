import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import { Mount, Unmount } from 'react-lifecycle-components';
import { Container, ActionMap, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
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

import { Avatar, Choice, Message, ChatState } from './types';

import { Query, Mutation } from 'react-apollo';
import { MESSAGE_QUERY } from './chat-query';
import { MESSAGE_SUBSCRIPTION } from './chat-subscription';
import { KeyboardAvoidingOnAndroid } from 'src/components/KeyboardAvoidingOnAndroid';
import gql from 'graphql-tag';
import { ConfirmationDialog } from './components/ConfirmationDialog';

const RESET_MUTATION = gql`
  mutation resetConversation {
    resetConversation
  }
`;

const CHAT_STATE_SUBSCRIPTON = gql`
  subscription ChatState($mostRecentTimestamp: String!) {
    chatState(mostRecentTimestamp: $mostRecentTimestamp) {
      ongoingClaim
      showOfferScreen
      onboardingDone
    }
  }
`;

interface ChatProps {
  isModal: boolean;
  componentId: string;
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

interface State {
  messages: Message[];
  avatars: Avatar[];
  chatState: ChatState;
  displayLoadingIndicator: boolean;
  stackedInterval: number;
  showResetDialog: boolean;
  unsubscribe: any;
  unsubscribeToMessages: (() => void) | null;
  unsubscribeToChatState: (() => void) | null;
}

interface Actions {
  setMessages: (messages: Message[]) => void;
  setChatState: (chatState: ChatState) => void;
  selectChoice: (message: Message, choice: Choice) => void;
  setShowResetDialog: (show: boolean) => void;
  setUnsubscribeToMessages: (unsubscribeToMessages: any) => void;
  setUnsubscribeToChatState: (unsubscribeToChatState: any) => void;
}

const actions: ActionMap<State, Actions> = {
  setMessages: (messages) => () => ({
    messages,
  }),
  setChatState: (chatState) => () => ({
    chatState,
  }),
  setUnsubscribeToMessages: (unsubscribeToMessages) => () => ({
    unsubscribeToMessages,
  }),
  setUnsubscribeToChatState: (unsubscribeToChatState) => () => ({
    unsubscribeToChatState,
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
  setShowResetDialog: (showResetDialog) => () => ({
    showResetDialog,
  }),
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

const Chat: React.SFC<ChatProps> = ({ isModal, componentId }) => (
  <Query query={MESSAGE_QUERY} fetchPolicy="network-only">
    {({ loading, error, data, subscribeToMore }) =>
      !loading && !error && data ? (
        <Container
          actions={actions}
          effects={effects}
          initialState={{
            messages: data.messages,
            avatars: data.avatars,
            chatState: data.chatState,
            displayLoadingIndicator: false,
            stackedInterval: 0,
          }}
        >
          {({
            messages,
            avatars,
            chatState,
            selectChoice,
            setMessages,
            setChatState,
            addToChat,
            stackedInterval,
            showResetDialog,
            setShowResetDialog,
            setUnsubscribeToMessages,
            unsubscribeToMessages,
            setUnsubscribeToChatState,
            unsubscribeToChatState,
          }) => (
            <>
              <NavigationEvents
                onNavigationButtonPressed={(event: any) => {
                  if (event.buttonId === RESTART_BUTTON.id) {
                    setShowResetDialog(true);
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
                  const mostRecentTimestamp =
                    messages.length !== 0
                      ? messages[0].header.timeStamp
                      : Number.MAX_SAFE_INTEGER.toString();

                  setUnsubscribeToChatState(
                    subscribeToMore({
                      document: CHAT_STATE_SUBSCRIPTON,
                      variables: {
                        mostRecentTimestamp,
                      },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        setChatState(subscriptionData.data.chatState);
                        return subscriptionData.data.chatState;
                      },
                      onError: (err) => console.log(err),
                    }),
                  );
                  setUnsubscribeToMessages(
                    subscribeToMore({
                      document: MESSAGE_SUBSCRIPTION,
                      variables: {
                        mostRecentTimestamp,
                      },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;

                        const newMessage = subscriptionData.data.messages[0];

                        const filteredMessages =
                          prev.messages &&
                          prev.messages.filter(
                            (m1: Message) =>
                              !subscriptionData.data.messages.some(
                                (m2: Message) => m1.globalId === m2.globalId,
                              ),
                          );

                        const deleted = prev.messages
                          ? filteredMessages.length !== prev.messages.length
                          : false;

                        const updatedMessages = Object.assign({}, prev, {
                          messages: prev.messages
                            ? deleted
                              ? filteredMessages
                              : [newMessage, ...prev.messages]
                            : [newMessage],
                        });

                        const pollingInterval =
                          newMessage.body.type === 'paragraph'
                            ? newMessage.header.pollingInterval || 0
                            : 0;

                        const delay = deleted ? 0 : pollingInterval;

                        addToChat(updatedMessages.messages, delay);

                        return updatedMessages;
                      },
                      onError: (err) => console.error(err),
                    }),
                  );
                }}
              >
                {null}
              </Mount>

              <Unmount
                on={() => {
                  if (unsubscribeToMessages !== null) {
                    unsubscribeToMessages();
                  }
                  if (unsubscribeToChatState !== null) {
                    unsubscribeToChatState();
                  }
                }}
              >
                {null}
              </Unmount>

              <NavigationOptions
                options={getNavigationOptions(
                  chatState.onboardingDone,
                  isModal,
                  chatState.showOfferScreen,
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

              <Mutation mutation={RESET_MUTATION}>
                {(reset) => (
                  <ConfirmationDialog
                    title={'Vill du börja om?'}
                    paragraph={
                      'Om du trycker ja så börjar\nkonversationen om från början'
                    }
                    confirmButtonTitle={'Ja'}
                    dismissButtonTitle={'Nej'}
                    showModal={showResetDialog}
                    updateModalVisibility={setShowResetDialog}
                    onConfirm={() => {
                      reset();
                    }}
                  />
                )}
              </Mutation>
            </>
          )}
        </Container>
      ) : (
        <Loader />
      )
    }
  </Query>
);

export default Chat;

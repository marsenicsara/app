import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import { Mount, Unmount } from 'react-lifecycle-components';
import { Container, ActionMap, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';

import { Avatar, Choice, Message, ChatState } from './types';
import { Query } from 'react-apollo';
import { MESSAGE_QUERY } from './chat-query';
import { MESSAGE_SUBSCRIPTION } from './chat-subscription';
import { KeyboardAvoidingOnAndroid } from 'src/components/KeyboardAvoidingOnAndroid';
import gql from 'graphql-tag';

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
  onRequestClose: () => void;
}

interface State {
  messages: Message[];
  avatars: Avatar[];
  chatState: ChatState;
  displayLoadingIndicator: boolean;
  stackedInterval: number;
  unsubscribe: any;
}

interface Actions {
  setMessages: (messages: Message[]) => void;
  setChatState: (chatState: ChatState) => void;
  selectChoice: (message: Message, choice: Choice) => void;
  setUnsubscribe: (unsubscribe: any) => void;
}

const actions: ActionMap<State, Actions> = {
  setMessages: (messages) => () => ({
    messages,
  }),
  setChatState: (chatState) => () => ({
    chatState,
  }),
  setUnsubscribe: (unsubscribe) => () => ({
    unsubscribe,
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

const showOffer = (onRequestClose: () => void) => {
  onRequestClose();
};

const Chat: React.SFC<ChatProps> = ({ onRequestClose }) => (
  <Query query={MESSAGE_QUERY} fetchPolicy="network-only">
    {({ loading, error, data, subscribeToMore }) => {
      console.log(data);
      return !loading && !error && data ? (
        <Container
          actions={actions}
          effects={effects}
          initialState={{
            messages: data.messages,
            avatars: data.avatars,
            chatState: data.chatState,
            displayLoadingIndicator: false,
            stackedInterval: 0,
            unsubscribe: null,
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
            setUnsubscribe,
            unsubscribe,
          }) => (
            <>
              <Mount
                on={() => {
                  const mostRecentTimestamp =
                    messages.length !== 0
                      ? messages[0].header.timeStamp
                      : Number.MAX_SAFE_INTEGER.toString();

                  subscribeToMore({
                    document: CHAT_STATE_SUBSCRIPTON,
                    variables: {
                      mostRecentTimestamp,
                    },
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev;
                      console.log('Chat state', subscriptionData.data);
                      setChatState(subscriptionData.data.chatState);
                      return subscriptionData.data.chatState;
                    },
                    onError: (err) => console.log(err),
                  });

                  setUnsubscribe(
                    subscribeToMore({
                      document: MESSAGE_SUBSCRIPTION,
                      variables: {
                        mostRecentTimestamp,
                      },
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;

                        console.log('\n\nPrev: ', prev.messages);

                        console.log(subscriptionData.data);

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

                        console.log('New message: ', newMessage);

                        if (prev.messages) {
                          console.log('Deleted: ', deleted);
                        }

                        console.log('Filtered: ', filteredMessages);

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
                      onError: (err) => console.log(err),
                    }),
                  );
                }}
              >
                {null}
              </Mount>
              <Unmount
                on={() => {
                  if (unsubscribe !== null) {
                    unsubscribe();
                  }
                }}
              >
                {null}
              </Unmount>

              <KeyboardAvoidingOnAndroid additionalPadding={8}>
                <Messages>
                  <MessageList
                    messages={messages}
                    avatars={avatars}
                    displayLoadingIndicator={stackedInterval !== 0}
                  />
                </Messages>

                <Response>
                  <InputComponent
                    showOffer={() => showOffer(onRequestClose)}
                    selectChoice={selectChoice}
                    messages={messages}
                  />
                </Response>
              </KeyboardAvoidingOnAndroid>
            </>
          )}
        </Container>
      ) : (
        <Loader />
      );
    }}
  </Query>
);

export default Chat;

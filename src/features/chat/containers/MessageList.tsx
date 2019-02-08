import * as React from 'react';
import { View, StyleSheet, FlatList, Text, Platform } from 'react-native';
import KeyboardSpacer from '@hedviginsurance/react-native-keyboard-spacer';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { StyledAvatarContainer } from '../styles/chat';
import Avatar from '../containers/Avatar';
import LoadingIndicator from '../containers/LoadingIndicator';
import { RichMessage } from '../components/rich-message';

import { InputHeightContainer } from './InputHeight';
import { Avatar as AvatarType, Message } from '../types';

const styles = StyleSheet.create({
  scrollContent: {
    flex: 1,
  },
  statusMessage: {
    fontFamily: 'CircularStd-Book',
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 4,
    color: '#8a8a99',
  },
  userMessageOuterContainer: { maxWidth: '88%' },
  userMessageInnerContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  messageUserContainer: { flexDirection: 'row-reverse', alignSelf: 'flex-end' },
  messageHedvigContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    width: '88%',
  },
  flatListContentContainer: {
    paddingBottom: 20,
  },
});

interface DefaultHedvigMessageProps {
  message: Message;
  index: number;
}

const DefaultHedvigMessage: React.SFC<DefaultHedvigMessageProps> = ({
  message,
  index,
}) =>
  message.body.text !== '' ? (
    <View style={styles.messageHedvigContainer}>
      <RichMessage
        withMargin
        index={index}
        message={message}
        fromUser={false}
      />
    </View>
  ) : null;

interface DefaultUserMessageProps {
  message: Message;
  index: number;
  canEdit: boolean;
}

const DefaultUserMessage: React.SFC<DefaultUserMessageProps> = ({
  message,
  index,
  canEdit,
}) => {
  const withMargin =
    !message.header.statusMessage ||
    (message.header.statusMessage && index !== 1)
      ? true
      : false;

  return (
    <View style={styles.userMessageOuterContainer}>
      <View style={styles.userMessageInnerContainer}>
        <RichMessage
          fromUser={true}
          index={index}
          message={message}
          withMargin={withMargin}
          canEdit={canEdit}
        />
      </View>
      {message.header.statusMessage &&
        index === 1 && (
          <Text style={styles.statusMessage}>
            {message.header.statusMessage}
          </Text>
        )}
    </View>
  );
};

const UserMessageMapping = {};

const HedvigMessageMapping = {
  hero: (message: Message, index: number) => null,
  bankid_collect: (message: Message, index: number) => null,
  audio: (message: Message, index: number) => null,
  polling: (message: Message, index: number) => null,
};

const renderMessage = (
  message: Message,
  idx: number,
  avatars: AvatarType[],
  displayLoadingIndicator: boolean,
  lastFromMyselfMessageId?: number | string,
) => {
  const fromMyself = message.header.fromMyself;
  const canEdit = lastFromMyselfMessageId === message.globalId;
  const lastIndex = idx === 0;

  let MessageRenderComponent: any = !fromMyself
    ? DefaultHedvigMessage
    : DefaultUserMessage;
  if (!fromMyself) {
    MessageRenderComponent = DefaultHedvigMessage;
    if (HedvigMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent =
        HedvigMessageMapping[
          message.body.type as keyof typeof HedvigMessageMapping
        ];
    }
  } else {
    MessageRenderComponent = DefaultUserMessage;
    if (UserMessageMapping.hasOwnProperty(message.body.type)) {
      MessageRenderComponent =
        UserMessageMapping[
          message.body.type as keyof typeof UserMessageMapping
        ];
    }
  }

  const avatar =
    lastIndex && message.header.avatarName ? (
      <StyledAvatarContainer>
        <Avatar
          avatar={avatars.find(
            (a: any) => a.name === message.header.avatarName,
          )}
        />
      </StyledAvatarContainer>
    ) : null;

  return (
    <View key={message.globalId || idx}>
      {avatar}
      <View
        style={
          fromMyself
            ? styles.messageUserContainer
            : styles.messageHedvigContainer
        }
      >
        <MessageRenderComponent
          message={message}
          index={idx}
          canEdit={canEdit}
        />
      </View>
      {lastIndex && displayLoadingIndicator ? (
        <LoadingIndicator
          avatar={avatars.find(
            (a: any) => a.name === message.header.loadingIndicator,
          )}
        />
      ) : null}
    </View>
  );
};

interface MessageListProps {
  messages: Message[];
  avatars: AvatarType[];
  displayLoadingIndicator: boolean;
}

const MessageList: React.SFC<MessageListProps> = ({
  messages,
  avatars,
  displayLoadingIndicator,
}) => {
  interface RenderItemInterface {
    item: Message;
    index: number;
  }

  const fromMyselfMessages = messages
    .filter((m) => m.header.fromMyself === true)
    .reverse();
  const lastFromMyselfMessageId =
    fromMyselfMessages.length === 0
      ? -1
      : fromMyselfMessages[fromMyselfMessages.length - 1].globalId;

  const renderItem = ({ item, index }: RenderItemInterface) =>
    renderMessage(
      item,
      index,
      avatars,
      displayLoadingIndicator,
      lastFromMyselfMessageId,
    );
  const keyExtractor = (item: Message) => '' + item.globalId;
  return (
    <InputHeightContainer>
      {({ inputHeight }) => (
        <FlatList
          inverted
          contentContainerStyle={styles.flatListContentContainer}
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          keyboardDismissMode="interactive"
          ListHeaderComponent={
            Platform.OS === 'ios' ? (
              <KeyboardSpacer
                restSpacing={isIphoneX() ? 35 : 0}
                topSpacing={inputHeight}
              />
            ) : (
              <View style={{ height: inputHeight }} />
            )
          }
        />
      )}
    </InputHeightContainer>
  );
};

export default MessageList;

import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import Hyperlink from 'react-native-hyperlink';

import EditMessageButton from '../../containers/EditMessageButton';
import {
  StyledUserChatMessage,
  StyledHedvigMessage,
  StyledDefaultUserMessageText,
} from '../../styles/chat';

import { Props } from './types';

const EditMessageButtonContainer = styled(View)(
  ({ hasStatusMessage }: { hasStatusMessage: boolean }) => ({
    marginLeft: 5,
    marginRight: 1,
    marginBottom: hasStatusMessage ? 0 : 10,
    alignItems: 'flex-end',
  }),
);

const getContainerComponent = (fromUser: boolean) =>
  fromUser ? StyledUserChatMessage : StyledHedvigMessage;

export const TextMessage: React.SFC<Props> = ({
  message,
  index,
  withMargin,
  fromUser,
}) => {
  const MessageContainer = getContainerComponent(fromUser);

  return (
    <>
      {message.header.editAllowed && (
        <EditMessageButtonContainer
          hasStatusMessage={!!message.header.statusMessage}
        >
          <EditMessageButton index={index} />
        </EditMessageButtonContainer>
      )}
      <MessageContainer withMargin={withMargin}>
        <Hyperlink
          linkDefault={true}
          linkStyle={{ textDecorationLine: 'underline' }}
        >
          <StyledDefaultUserMessageText fromUser={fromUser}>
            {message.body.text}
          </StyledDefaultUserMessageText>
        </Hyperlink>
      </MessageContainer>
    </>
  );
};

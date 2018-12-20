import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import Hyperlink from 'react-native-hyperlink';
import { Mutation } from 'react-apollo';
import { Container } from 'constate';

import EditMessageButton from 'src/features/chat/containers/EditMessageButton';
import {
  StyledUserChatMessage,
  StyledHedvigMessage,
  StyledDefaultUserMessageText,
} from '../../styles/chat';

import { Props } from './types';
import gql from 'graphql-tag';

const EDIT_LAST_RESPONSE_MUTATION = gql`
  mutation editLastResponse {
    editLastResponse
  }
`;

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
    <Container initialState={{ showEditDialog: false }}>
      {({ showEditDialog }) => (
        <>
          {message.header.editAllowed && (
            <EditMessageButtonContainer
              hasStatusMessage={!!message.header.statusMessage}
            >
              <Mutation mutation={EDIT_LAST_RESPONSE_MUTATION}>
                {(edit) => (
                  <EditMessageButton
                    onPress={() => {
                      edit();
                    }}
                  />
                )}
              </Mutation>
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
      )}
    </Container>
  );
};

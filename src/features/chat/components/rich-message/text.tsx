import * as React from 'react';
import { View } from 'react-native';
import styled from '@sampettersson/primitives';
import Hyperlink from 'react-native-hyperlink';
import { Mutation } from 'react-apollo';
import { Container, ActionMap } from 'constate';

import EditMessageButton from 'src/features/chat/containers/EditMessageButton';
import {
  StyledUserChatMessage,
  StyledHedvigMessage,
  StyledDefaultUserMessageText,
} from '../../styles/chat';

import { Props } from './types';
import gql from 'graphql-tag';
import { ConfirmationDialog } from '../ConfirmationDialog';

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

interface State {
  showEditDialog: boolean;
}

interface Actions {
  setShowEditDialog: (show: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setShowEditDialog: (showEditDialog) => () => ({
    showEditDialog,
  }),
};

const getContainerComponent = (fromUser: boolean) =>
  fromUser ? StyledUserChatMessage : StyledHedvigMessage;

export const TextMessage: React.SFC<Props> = ({
  message,
  index,
  withMargin,
  fromUser,
  canEdit,
}) => {
  const MessageContainer = getContainerComponent(fromUser);
  return (
    <Container actions={actions} initialState={{ showEditDialog: false }}>
      {({ showEditDialog, setShowEditDialog }) => (
        <>
          {message.header.editAllowed &&
            canEdit && (
              <EditMessageButtonContainer
                hasStatusMessage={!!message.header.statusMessage}
              >
                <EditMessageButton
                  onPress={() => {
                    setShowEditDialog(true);
                  }}
                />
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

          {canEdit && (
            <Mutation mutation={EDIT_LAST_RESPONSE_MUTATION}>
              {(edit) => (
                <ConfirmationDialog
                  title={'Vill du ändra ditt svar?'}
                  paragraph={
                    'Tryck ja för att ändra ditt\nsvar på förra frågan'
                  }
                  confirmButtonTitle={'Ja'}
                  dismissButtonTitle={'Nej'}
                  showModal={showEditDialog}
                  updateModalVisibility={setShowEditDialog}
                  onConfirm={() => {
                    edit();
                  }}
                />
              )}
            </Mutation>
          )}
        </>
      )}
    </Container>
  );
};

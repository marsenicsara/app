import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from '@sampettersson/primitives';
import { Mutation } from 'react-apollo';
import { RestartOfferContainer } from '../features/chat/containers/restartOffer';
import gql from 'graphql-tag';
import { ModalDialog } from './ModalDialog';
import { Delayed } from './Delayed';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Restart } from 'src/components/icons/Restart';
import { colors } from '@hedviginsurance/brand';
import { resetLoggedInUser } from 'src/utils';

const RestartButton = styled(TouchableOpacity)({});

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;

interface Props {
  onCloseClick: () => void;
}

export const RestartOfferChat: React.SFC<Props> = ({ onCloseClick }) => (
  <Mutation mutation={LOGOUT_MUTATION}>
    {(logout, { client }) => (
      <RestartOfferContainer>
        {(state) => (
          <>
            <RestartButton
              onPress={() => {
                state.updateModalVisibility(true);
              }}
            >
              <Restart width={24} height={24} fill={colors.WHITE} />
            </RestartButton>

            <Delayed
              mountChildren={state.showModal}
              mountChildrenAfter={100}
              unmountChildrenAfter={100}
            >
              <ModalDialog
                title={
                  <TranslationsConsumer textKey="RESTART_OFFER_CHAT_TITLE">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                paragraph={
                  <TranslationsConsumer textKey="RESTART_OFFER_CHAT_PARAGRAPH">
                    {(text) => text}
                  </TranslationsConsumer>
                }
                confirmButtonTitle={'RESTART_OFFER_CHAT_BUTTON_CONFIRM'}
                dismissButtonTitle={'RESTART_OFFER_CHAT_BUTTON_DISMISS'}
                onConfirm={async () => {
                  onCloseClick();
                  state.updateModalVisibility(false);
                  resetLoggedInUser(logout, client);
                }}
                onDismiss={() => {
                  state.updateModalVisibility(false);
                }}
              />
            </Delayed>
          </>
        )}
      </RestartOfferContainer>
    )}
  </Mutation>
);

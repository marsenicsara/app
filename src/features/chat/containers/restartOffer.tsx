import * as React from 'react';
import { Container, ActionMap } from 'constate';

interface State {
  showModal: boolean;
}

interface Actions {
  updateModalVisibility: (visible: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  updateModalVisibility: (visible) => () => ({
    showModal: visible,
  }),
};

interface Props {
  children: (stateAndActions: State & Actions) => React.ReactNode;
}

export const RestartOfferContainer: React.SFC<Props> = ({ children }) => (
  <Container
    context="restartOffer"
    initialState={{ showModal: false }}
    actions={actions}
  >
    {children}
  </Container>
);

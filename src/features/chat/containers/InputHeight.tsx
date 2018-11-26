import * as React from 'react';
import { Container, ActionMap } from 'constate';

interface State {
  inputHeight: number;
}

interface Actions {
  setInputHeight: (inputHeight: number) => void;
}

const actions: ActionMap<State, Actions> = {
  setInputHeight: (inputHeight) => () => ({
    inputHeight,
  }),
};

interface Props {
  children: (stateAndActions: State & Actions) => React.ReactNode;
}

export const InputHeightContainer: React.SFC<Props> = ({ children }) => (
  <Container context="inputHeight" actions={actions}>
    {children}
  </Container>
);

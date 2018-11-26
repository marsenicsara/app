import * as React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { Container, ActionMap } from 'constate';
import color from 'color';

interface State {
  dataQuery: string;
}

interface Actions {
  setDataQuery: (dataQuery: string) => void;
}

const actions: ActionMap<State, Actions> = {
  setDataQuery: (dataQuery) => () => ({
    dataQuery,
  }),
};

const SearchBarInputContainer = styled(View)({
  padding: 10,
  alignItems: 'center',
});

const SearchBarInput = styled(TextInput)({
  height: 40,
  width: '100%',
  backgroundColor: color(colors.WHITE).alpha(0.8),
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: color(colors.DARK_GRAY).lighten(0.15),
  padding: 10,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 20,
  fontFamily: fonts.CIRCULAR,
});

interface SearchBarProps {
  children: (dataQuery: string) => React.ReactNode;
}

export const SearchBar: React.SFC<SearchBarProps> = ({ children }) => (
  <Container actions={actions} initialState={{ dataQuery: '' }}>
    {({ dataQuery, setDataQuery }) => (
      <>
        <SearchBarInputContainer>
          <SearchBarInput
            autoCorrect={false}
            placeholder="Sök..."
            onChangeText={(text: string) => setDataQuery(text)}
          />
        </SearchBarInputContainer>
        {children(dataQuery)}
      </>
    )}
  </Container>
);

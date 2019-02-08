import * as React from 'react';
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { Container, ActionMap } from 'constate';
import RNConfig from '@hedviginsurance/react-native-config';
import { Store } from 'src/setupApp';
import { CUSTOM_CONFIG } from 'src/constants';

import { Spacing } from 'src/components/Spacing';

import { Row } from './row';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

interface State {
  isOpen: boolean;
}

interface Actions {
  setIsOpen: (isOpen: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setIsOpen: (isOpen) => () => ({
    isOpen,
  }),
};

const ModalContent = styled(View)({
  padding: 20,
});

const Label = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontWeight: '700',
  fontSize: 17,
  color: colors.BLACK,
});

const Input = styled(TextInput)({
  width: '100%',
  height: 40,
  fontSize: 15,
  fontFamily: fonts.CIRCULAR,
  borderBottomWidth: 1,
  borderBottomColor: colors.PURPLE,
});

const Button = styled(TouchableOpacity)({
  backgroundColor: colors.PURPLE,
  height: 30,
  width: '100%',
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
});

const ButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 15,
  color: colors.WHITE,
});

export const Config = () => (
  <Container actions={actions} initialState={{ isOpen: false }}>
    {({ isOpen, setIsOpen }) => (
      <>
        <Row onPress={() => setIsOpen(true)}>Change app environment config</Row>
        <Modal
          onRequestClose={() => setIsOpen(false)}
          visible={isOpen}
          animationType="slide"
        >
          <ModalContent>
            <Spacing height={20} />
            <Label>Gateway url</Label>
            <Spacing height={10} />
            <Input
              placeholder="Gateway url"
              defaultValue={RNConfig.API_BASE_URL}
              onChangeText={(text: string) => {
                Object.defineProperty(RNConfig, 'API_BASE_URL', {
                  get: function() {
                    return text;
                  },
                });
              }}
            />
            <Spacing height={20} />
            <Label>Upload url</Label>
            <Spacing height={10} />
            <Input
              placeholder="Upload url"
              defaultValue={RNConfig.UPLOAD_URL}
              onChangeText={(text: string) => {
                Object.defineProperty(RNConfig, 'UPLOAD_URL', {
                  get: function() {
                    return text;
                  },
                });
              }}
            />
            <Spacing height={20} />
            <Label>🐷 url</Label>
            <Spacing height={10} />
            <Input
              placeholder="Pig url"
              defaultValue={RNConfig.PIG_URL}
              onChangeText={(text: string) => {
                Object.defineProperty(RNConfig, 'PIG_URL', {
                  get: function() {
                    return text;
                  },
                });
              }}
            />
            <Spacing height={20} />
            <Label>🦒 url</Label>
            <Spacing height={10} />
            <Input
              placeholder="Graphql url"
              defaultValue={RNConfig.GRAPHQL_URL}
              onChangeText={(text: string) => {
                Object.defineProperty(RNConfig, 'GRAPHQL_URL', {
                  get: function() {
                    return text;
                  },
                });
              }}
            />
            <Spacing height={20} />
            <Button
              onPress={() => {
                AsyncStorage.setItem(CUSTOM_CONFIG, JSON.stringify(RNConfig));
                Store.dispatch({ type: 'DELETE_TOKEN' });
                Store.dispatch({ type: 'DELETE_TRACKING_ID' });
                Store.dispatch({ type: 'AUTHENTICATE' });
                setIsOpen(false);
              }}
            >
              <ButtonText>Save and close</ButtonText>
            </Button>
          </ModalContent>
        </Modal>
      </>
    )}
  </Container>
);

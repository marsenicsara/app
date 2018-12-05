import React from 'react';
import { StyleSheet, TextInput, Text, Platform, View } from 'react-native';
import firebase from 'react-native-firebase';
import styled from '@sampettersson/primitives';
import color from 'color';
import { BlurView } from 'react-native-blur';
import KeyboardSpacer from '@hedviginsurance/react-native-keyboard-spacer';
import mime from 'mime-types';

import { chatActions, dialogActions } from '../../../../hedvig-redux';
import { SendButton } from '../components/Button';
import { SendChatFileResponseComponent } from 'src/graphql/components';

import { colors, fonts } from '@hedviginsurance/brand';
import { Provider } from '../components/upload/context';
import { Picker } from '../components/upload/picker';
import { Picker as GiphyPicker } from '../components/giphy-picker/picker';
import { Provider as GiphyProvider } from '../components/giphy-picker/context';
import { Buttons } from '../components/pickers/buttons';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { BlurSwitchContainer } from '../components/BlurSwitchContainer';
import { InputHeightContainer } from './InputHeight';

import { Message } from '../types';
import { Container, ActionMap } from 'constate';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const TextField = styled(TextInput)({
  flex: 1,
  alignSelf: 'stretch',
  minHeight: 40,
  maxHeight: 160,
  paddingRight: 16,
  paddingLeft: 16,
  marginRight: 8,
  fontSize: 15,
  overflow: 'hidden',
  fontFamily: fonts.CIRCULAR,
  ...Platform.select({
    android: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    ios: {
      paddingTop: 10,
      paddingBottom: 10,
    },
  }),
});

const BarContainer = styled(View)({
  borderTopWidth: StyleSheet.hairlineWidth,
  borderColor: color(colors.DARK_GRAY).lighten(0.15),
});

const Bar = styled(View)({
  flexDirection: 'row',
  alignItems: 'flex-end',
  paddingTop: 8,
  paddingRight: 8,
  paddingLeft: 8,
  paddingBottom: 8,
});

const TextInputContainer = styled(View)({
  flexDirection: 'row',
  flex: 1,
  backgroundColor: color(colors.WHITE).alpha(0.8),
  borderColor: color(colors.DARK_GRAY).lighten(0.15),
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: 24,
  alignItems: 'flex-end',
});

interface State {
  height: number;
  inputValue: string;
  scrollEnabled: boolean;
}

const initialState: State = {
  height: 0,
  inputValue: '',
  scrollEnabled: false,
};

interface Actions {
  setInputValue: (inputValue: string) => void;
  setScrollEnabled: (scrollEnabled: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setInputValue: (inputValue) => () => ({
    inputValue,
  }),
  setScrollEnabled: (scrollEnabled) => () => ({
    scrollEnabled,
  }),
};

const sendFileMessage = (key?: any) => {
  console.log('key', key);
};

const SEND_TEXT_RESPONSE_MUTATION = gql`
  mutation sendChatTextResponse($input: ChatResponseTextInput!) {
    sendChatTextResponse(input: $input)
  }
`;

const SEND_FILE_RESPONSE_MUTATION = gql`
  mutation sendChatTextResponse($input: ChatResponseTextInput!) {
    sendChatTextResponse(input: $input)
  }
`;

interface ChatTextInputProps {
  message: Message;
  isSending?: boolean;
  keyboardType?: any; // FIX
}

const ChatTextInput: React.SFC<ChatTextInputProps> = ({
  message,
  isSending = false,
  keyboardType,
}) => {
  const richTextChatCompatible = message.header.richTextChatCompatible;
  let ref: any;
  return (
    <Container actions={actions} initialState={initialState}>
      {({ setInputValue, setScrollEnabled, inputValue, scrollEnabled }) => (
        <Mutation mutation={SEND_TEXT_RESPONSE_MUTATION}>
          {(sendChatTextResponse) => (
            <Mutation mutation={SEND_FILE_RESPONSE_MUTATION}>
              {(sendChatFileResponse) => {
                const send = (inputMessage?: string) => {
                  console.log(ref);
                  if (!isSending) {
                    const value = String(
                      typeof inputMessage === 'string'
                        ? inputMessage
                        : inputValue,
                    );
                    ref.clear();
                    sendChatTextResponse({
                      variables: {
                        input: {
                          globalId: message.globalId,
                          body: { text: value },
                        },
                      },
                    });
                  }
                };

                return (
                  <Provider>
                    <GiphyProvider>
                      <BlurSwitchContainer>
                        <BarContainer>
                          <InputHeightContainer>
                            {({ setInputHeight }) => (
                              <View
                                onLayout={(event) => {
                                  setInputHeight(
                                    event.nativeEvent.layout.height,
                                  );
                                }}
                              >
                                <Bar>
                                  {richTextChatCompatible && <Buttons />}
                                  <TextInputContainer>
                                    <TextField
                                      innerRef={(el: React.ReactNode) =>
                                        (ref = el)
                                      }
                                      autoFocus
                                      autoCapitalize="none"
                                      placeholder={
                                        keyboardType === 'numeric' ||
                                        !richTextChatCompatible
                                          ? 'Skriv här...'
                                          : 'Aa'
                                      }
                                      underlineColorAndroid="transparent"
                                      onChangeText={setInputValue}
                                      scrollEnabled={
                                        richTextChatCompatible
                                          ? scrollEnabled
                                          : undefined
                                      }
                                      multiline={richTextChatCompatible}
                                      keyboardType={keyboardType}
                                      returnKeyType={
                                        richTextChatCompatible
                                          ? 'default'
                                          : 'send'
                                      }
                                      onSubmitEditing={() => {
                                        if (!richTextChatCompatible) {
                                          setInputValue('');
                                          send();
                                        }
                                      }}
                                      onContentSizeChange={(event: any) => {
                                        setScrollEnabled(
                                          event.nativeEvent.contentSize.height >
                                            130,
                                        );
                                      }}
                                      enablesReturnKeyAutomatically
                                    />
                                    <SendButton
                                      onPress={send}
                                      disabled={!inputValue}
                                      size="small"
                                    />
                                  </TextInputContainer>
                                </Bar>
                                <SendChatFileResponseComponent>
                                  {(mutate) => (
                                    <Picker
                                      sendMessage={(key) => {
                                        mutate({
                                          variables: {
                                            input: {
                                              globalId: message.globalId,
                                              body: {
                                                key,
                                                mimeType:
                                                  mime.lookup(key) || '',
                                              },
                                            },
                                          },
                                        });
                                      }}
                                    />
                                  )}
                                </SendChatFileResponseComponent>
                                <GiphyPicker sendMessage={send} />
                              </View>
                            )}
                          </InputHeightContainer>
                          {Platform.OS === 'ios' && (
                            <KeyboardSpacer
                              restSpacing={isIphoneX() ? 35 : 0}
                            />
                          )}
                        </BarContainer>
                      </BlurSwitchContainer>
                    </GiphyProvider>
                  </Provider>
                );
              }}
            </Mutation>
          )}
        </Mutation>
      )}
    </Container>
  );
};

export default ChatTextInput;

/*
class ChatTextInput extends React.Component {
  static propTypes = {
    message: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    isSending: PropTypes.bool,
    inputValue: PropTypes.string,
  };

  static defaultProps = {
    isSending: false,
    inputValue: '',
  };

  state = {
    height: 0,
    inputValue: '',
    scrollEnabled: false,
  };

  requestPush = () => {
    if (this.props.message.header.shouldRequestPushNotifications) {
      this.props.requestPushNotifications();
    }
  };

  _send = (message) => {
    this.requestPush();
    if (!this.props.isSending) {
      const inputValue = String(
        typeof message === 'string' ? message : this.state.inputValue,
      );
      this.ref.clear();
      this.props.send(this.props.message, inputValue);
    }
  };

  sendFileMessage = (key) => {
    this.requestPush();
    this.props.send(
      this.props.message,
      JSON.stringify({
        type: 'file',
        key: key,
      }),
    );
  };

  _onTextChange = (text) => {
    this.setState({ inputValue: text });
  };

  render() {
    const richTextChatCompatible = this.props.message.header
      .richTextChatCompatible;

    return (
      <Provider>
        <GiphyProvider>
          <BlurContainer blurType="xlight">
            <BarContainer>
              <InputHeightContainer>
                {({ setInputHeight }) => (
                  <View
                    onLayout={(event) => {
                      setInputHeight(event.nativeEvent.layout.height);
                    }}
                  >
                    <Bar>
                      {richTextChatCompatible && <Buttons />}
                      <TextInputContainer>
                        <TextInput
                          ref={(ref) => (this.ref = ref)}
                          style={[styles.textInput]}
                          autoFocus
                          autoCapitalize="none"
                          placeholder={
                            this.props.keyboardType === 'numeric' ||
                            !richTextChatCompatible
                              ? 'Skriv här...'
                              : 'Aa'
                          }
                          underlineColorAndroid="transparent"
                          onChangeText={this._onTextChange}
                          scrollEnabled={
                            richTextChatCompatible
                              ? this.state.scrollEnabled
                              : undefined
                          }
                          multiline={richTextChatCompatible}
                          keyboardType={this.props.keyboardType}
                          returnKeyType={
                            richTextChatCompatible ? 'default' : 'send'
                          }
                          onSubmitEditing={() => {
                            if (!richTextChatCompatible) {
                              this._send();
                            }
                          }}
                          onContentSizeChange={(event) => {
                            if (event.nativeEvent.contentSize.height > 130) {
                              this.setState({ scrollEnabled: true });
                            } else {
                              this.setState({ scrollEnabled: false });
                            }
                          }}
                          enablesReturnKeyAutomatically
                        />
                        <SendButton
                          onPress={this._send}
                          disabled={!this.state.inputValue}
                          size="small"
                        />
                      </TextInputContainer>
                    </Bar>
                    <Picker sendMessage={this.sendFileMessage} />
                    <GiphyPicker sendMessage={this._send} />
                  </View>
                )}
              </InputHeightContainer>
              <KeyboardSpacer restSpacing={isIphoneX() ? 35 : 0} />
            </BarContainer>
          </BlurContainer>
        </GiphyProvider>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (value) =>
      dispatch({ type: 'CHAT/SET_INPUT_VALUE', payload: value }),
    send: (message, text) =>
      dispatch(
        chatActions.sendChatResponse(message, {
          text,
        }),
      ),
    sendFile: (message, bodyOverride) =>
      dispatch(chatActions.sendChatResponse(message, bodyOverride)),
    requestPushNotifications: async () => {
      if (Platform.OS === 'android') {
        return dispatch({
          type: 'PUSH_NOTIFICATIONS/REQUEST_PUSH',
        });
      }

      const enabled = await firebase.messaging().hasPermission();

      if (!enabled) {
        dispatch(
          dialogActions.showDialog({
            title: 'Notifikationer',
            paragraph:
              'Slå på notiser så att du inte missar när Hedvig svarar!',
            confirmButtonTitle: 'Slå på',
            dismissButtonTitle: 'Inte nu',
            onConfirm: () =>
              dispatch({
                type: 'PUSH_NOTIFICATIONS/REQUEST_PUSH',
              }),
            onDismiss: () => {},
          }),
        );
      } else {
        dispatch({
          type: 'PUSH_NOTIFICATIONS/REQUEST_PUSH',
        });
      }
    },
  };
};

const ChatTextInputContainer = connect(
  null,
  mapDispatchToProps,
)(ChatTextInput);

export default ChatTextInputContainer;
*/

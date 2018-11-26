import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Platform, View } from 'react-native';
import styled from '@sampettersson/primitives';
import color from 'color';
import { BlurView } from 'react-native-blur';
import KeyboardSpacer from '@hedviginsurance/react-native-keyboard-spacer';
import mime from 'mime-types';
import { Container } from 'constate';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { chatActions, dialogActions } from '../../../../../hedvig-redux';
import { SendButton } from '../../components/Button';
import { SendChatFileResponseComponent } from 'src/graphql/components';

import { colors, fonts } from '@hedviginsurance/brand';
import { Provider } from '../../components/upload/context';
import { Picker } from '../../components/upload/picker';
import { Picker as GiphyPicker } from '../../components/giphy-picker/picker';
import { Provider as GiphyProvider } from '../../components/giphy-picker/context';
import { Buttons } from '../../components/pickers/buttons';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { InputHeightContainer } from '../InputHeight';

const styles = StyleSheet.create({
  textInput: {
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
  },
});

const BlurContainer = styled(Platform.OS === 'android' ? View : BlurView)({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  ...Platform.select({
    ios: {},
    android: {
      backgroundColor: colors.WHITE,
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

const actions = {
  setValue: (value) => () => ({
    value,
  }),
};

class ChatTextInput extends React.Component {
  static propTypes = {
    message: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    isSending: PropTypes.bool,
  };

  static defaultProps = {
    isSending: false,
  };

  state = {
    height: 0,
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
      console.log(message);
      const inputValue = String(message);
      this.props.send(this.props.message, inputValue);
    }
  };

  render() {
    const richTextChatCompatible = this.props.message.header
      .richTextChatCompatible;

    return (
      <Container actions={actions} context="chatTextInputState">
        {({ setValue, value }) => (
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
                              onChangeText={setValue}
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
                                  setValue('');
                                  this._send(value);
                                }
                              }}
                              onContentSizeChange={(event) => {
                                if (
                                  event.nativeEvent.contentSize.height > 130
                                ) {
                                  this.setState({ scrollEnabled: true });
                                } else {
                                  this.setState({ scrollEnabled: false });
                                }
                              }}
                              enablesReturnKeyAutomatically
                            />
                            <SendButton
                              onPress={() => this._send(value)}
                              disabled={!value}
                              size="small"
                            />
                          </TextInputContainer>
                        </Bar>
                        <SendChatFileResponseComponent>
                          {(mutate) => (
                            <Picker
                              sendMessage={(key) => {
                                this.requestPush();
                                mutate({
                                  variables: {
                                    input: {
                                      globalId: this.props.message.globalId,
                                      body: {
                                        key,
                                        mimeType: mime.lookup(key),
                                      },
                                    },
                                  },
                                }).then(() => {
                                  this.props.getMessages();
                                });
                              }}
                            />
                          )}
                        </SendChatFileResponseComponent>
                        <GiphyPicker sendMessage={this._send} />
                      </View>
                    )}
                  </InputHeightContainer>
                  {Platform.OS === 'ios' && (
                    <KeyboardSpacer restSpacing={isIphoneX() ? 35 : 0} />
                  )}
                </BarContainer>
              </BlurContainer>
            </GiphyProvider>
          </Provider>
        )}
      </Container>
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
    getMessages: () =>
      dispatch(
        chatActions.getMessages({
          intent: '',
        }),
      ),
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

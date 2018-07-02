import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, TextInput } from 'react-native';
import { Permissions } from 'expo';

import { chatActions, dialogActions } from '../../../../hedvig-redux';
import { StyledTextInputContainer } from '../styles/chat';
import { isSendingChatMessage } from '../state/selectors';
import { SendButton } from '../components/Button';

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderColor: '#651eff',
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    overflow: 'hidden',
  },
});

class ChatTextInput extends React.Component {
  static propTypes = {
    message: PropTypes.object, // TODO Better definition for the shape of a message - should be reusable
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
  };

  _send = async () => {
    if (this.props.message.header.shouldRequestPushNotifications) {
      const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        if (!(__DEV__ && status === 'undetermined')) {
          this.props.requestPushNotifications();
        }
      }
    }
    if (!this.props.isSending) {
      this.props.send(this.props.message, this.props.inputValue);
    }
  };

  _handleContentSizeChange = (event) => {
    if (event && event.nativeEvent && event.nativeEvent.contentSize) {
      this.setState({ height: event.nativeEvent.contentSize.height });
    }
  };

  _onTextChange = (text) => {
    this.props.onChange(text);
  };

  render() {
    const { isSending, inputValue } = this.props;
    return (
      <StyledTextInputContainer>
        <TextInput
          style={[
            styles.textInput,
            { height: Math.max(40, this.state.height) },
          ]}
          autoFocus
          placeholder="Skriv här..."
          value={inputValue}
          underlineColorAndroid="transparent"
          onChangeText={this._onTextChange}
          multiline
          returnKeyType="send"
          enablesReturnKeyAutomatically
          blurOnSubmit
          onSubmitEditing={this._send}
          editable={!isSending}
          onContentSizeChange={this._handleContentSizeChange}
        />
        <SendButton
          onPress={this._send}
          disabled={!(inputValue && inputValue.length > 0 && !isSending)}
        />
      </StyledTextInputContainer>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
    isSending: isSendingChatMessage(state),
    inputValue: state.chat.inputValue,
  };
};

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
    requestPushNotifications: () => {
      dispatch(
        dialogActions.showDialog({
          title: 'Notifikationer',
          paragraph:
            'Slå på push-notiser så att du inte missar när Hedvig svarar!',
          confirmButtonTitle: 'Slå på',
          dismissButtonTitle: 'Inte nu',
          onConfirm: () =>
            dispatch({
              type: 'PUSH_NOTIFICATIONS/REQUEST_PUSH',
            }),
          onDismiss: () => {},
        }),
      );
    },
  };
};

const ChatTextInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatTextInput);

export default ChatTextInputContainer;
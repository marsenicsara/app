import { connect } from 'react-redux';
import React, { Fragment } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Linking,
  Keyboard,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import * as R from 'ramda';

import { BackButton } from 'src/components/BackButton';
import {
  BANKID_SIGN,
  BANKID_SIGN_CANCEL,
  BANKID_DIALOG_SHOWN,
  BANKID_DIALOG_DISMISSED,
} from './actions';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  shadow: {
    backgroundColor: colors.BLACK,
    opacity: 0.5,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 8,
    maxWidth: '80%',
  },
  status: {
    fontFamily: 'CircularStd-Book',
    fontSize: 20,
    lineHeight: 28,
    marginTop: 20,
    paddingBottom: 25,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: 'center',
  },
  loader: {
    marginTop: 30,
  },
  buttonContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: colors.OFF_WHITE,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRightBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.OFF_WHITE,
  },
  buttonText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    lineHeight: 25,
    color: colors.PURPLE,
    textAlign: 'center',
  },
  buttonTextIsPrimary: {
    fontFamily: 'CircularStd-Bold',
  },
  bankIdLink: { color: '#555555', textDecorationLine: 'underline' },
});

const UNKNOWN_ERROR_MESSAGE = `Ojdå! Okänt fel 🙈`;
const messages = [
  {
    status: 'pending',
    hintCode: 'outstandingTransaction',
    getMessage: (isSigning, hasClientFailedToOpen) =>
      `${
        hasClientFailedToOpen
          ? `Starta BankID-appen`
          : `Försöker starta BankID-appen`
      }`,
  },
  {
    status: 'pending',
    hintCode: 'noClient',
    getMessage: () => 'Starta BankID-appen',
  },
  {
    status: 'pending',
    hintCode: 'started',
    getMessage: (isSigning) =>
      `🕵️‍ Söker efter BankID, det kan ta en liten stund… Om det har gått några sekunder och inget BankID har hittats har du sannolikt inget BankID som går att använda för den aktuella ${
        isSigning ? 'underskriften' : 'inloggningen'
      } i den här enheten. Om du inte har något BankID kan du hämta ett hos din internetbank. Om du har ett BankID på en annan enhet kan du starta din BankID-app där`,
  },
  {
    status: 'pending',
    hintCode: 'userSign',
    getMessage: () =>
      `Skriv in din säkerhetskod i BankID-appen och välj Legitimera`,
  },
  {
    status: 'pending',
    hintCode: 'unknown',
    getMessage: (isSigning) =>
      `${isSigning ? 'Signering' : 'Inloggning'} pågår`,
  },
  {
    status: 'complete',
    hintCode: 'unknown',
    getMessage: (isSigning) =>
      `${isSigning ? 'Signering godkänd 👌' : 'Inloggning lyckades 👋'}`,
  },
  {
    status: 'failed',
    hintCode: 'expiredTransaction',
    getMessage: () =>
      `BankID-appen svarar inte. Kontrollera att den är startad och att du har internetanslutning. Om du inte har något giltigt BankID kan du hämta ett hos din Bank. Försök sedan igen`,
  },
  {
    status: 'failed',
    hintCode: 'certificateErr',
    getMessage: () =>
      `Det BankID du försöker använda är för gammalt eller spärrat. Använd ett annat BankID eller hämta ett nytt hos din internetbank`,
  },
  {
    status: 'failed',
    hintCode: 'userCancel',
    getMessage: (isSigning) =>
      `${isSigning ? 'Signering' : 'Inloggning'} avbruten 🙅‍`,
  },
  {
    status: 'failed',
    hintCode: 'cancelled',
    getMessage: (isSigning) =>
      `${isSigning ? 'Signering' : 'Inloggning'} avbruten 🙅‍`,
  },
  {
    status: 'failed',
    hintCode: 'startFailed',
    getMessage: () => [
      `BankID-appen verkar inte finnas i din telefon. Installera den och hämta ett BankID hos din internetbank. Installera appen från `,
      <Text
        key={'bankid-link'}
        style={styles.bankIdLink}
        onPress={() => Linking.openURL('https://install.bankid.com')}
      >
        install.bankid.com
      </Text>,
    ],
  },
  {
    status: 'failed',
    hintCode: 'invalidParameters',
    getMessage: () => UNKNOWN_ERROR_MESSAGE,
  },
  {
    status: 'failed',
    hintCode: 'alreadyInProgress',
    getMessage: (isSigning) =>
      `Avbryter tidigare ${
        isSigning ? 'signering' : 'inloggning'
      }, vänta några sekunder och försök sedan igen`,
  },
  {
    status: 'failed',
    hintCode: 'requestTimeout',
    getMessage: () => UNKNOWN_ERROR_MESSAGE,
  },
  {
    status: 'failed',
    hintCode: 'internalError',
    getMessage: () => UNKNOWN_ERROR_MESSAGE,
  },
  {
    status: 'failed',
    hintCode: 'Maintenance',
    getMessage: () => UNKNOWN_ERROR_MESSAGE,
  },
  {
    status: 'failed',
    hintCode: 'unknown',
    getMessage: () => UNKNOWN_ERROR_MESSAGE,
  },
];

class Dialog extends React.Component {
  state = {
    isVisible: false,
  };

  componentDidUpdate() {
    if (this.props.bankid.sign.isCurrentlySigning) {
      this._show();
    } else {
      this._dismiss();
    }
  }

  _show() {
    if (!this.state.isVisible) {
      Keyboard.dismiss();
      this.setState({ isVisible: true });
    }
  }

  _dismiss() {
    if (this.state.isVisible) {
      this.setState({ isVisible: false });
    }
  }

  _signCancel = () => this.props.signCancel();

  _getHintCode() {
    const { response } = this.props.bankid.collect;
    return response.hintCode || response.errorCode || 'unknown';
  }

  getStatus() {
    const { response } = this.props.bankid.collect;
    return response.errorCode ? 'failed' : response.status || 'pending';
  }

  getMessage() {
    const status = this.getStatus();
    const hintCode = this._getHintCode();
    const statusMessages = R.filter(R.propEq('status', status), messages);
    const message = R.find(R.propEq('hintCode', hintCode))(statusMessages);
    const { hasClientFailedToOpen } = this.props.bankid.sign;
    const msg = message && message.getMessage(true, hasClientFailedToOpen);
    // report sentry if no msg
    return msg || UNKNOWN_ERROR_MESSAGE;
  }

  render() {
    const { isCurrentlySigning } = this.props.bankid.sign;
    return (
      this.state.isVisible &&
      isCurrentlySigning && (
        <Modal onRequestClose={() => this._dismiss()} transparent>
          <BackButton onPress={this._signCancel} />
          <View style={styles.container}>
            <TouchableWithoutFeedback
              accessibilityTraits="none"
              accessibilityComponentType="none"
              onPress={() => this._dismiss()}
            >
              <View style={styles.shadow} />
            </TouchableWithoutFeedback>
            <View style={styles.content}>
              {this.getStatus() === 'pending' && (
                <Fragment>
                  <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#651EFF"
                  />
                  <Text style={styles.status}>{this.getMessage()}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.props.signCancel()}
                      accessibilityTraits="button"
                      accessibilityComponentType="button"
                    >
                      <Text style={styles.buttonText}>Avbryt</Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              )}
              {this.getStatus() === 'complete' && (
                <Fragment>
                  <Text style={styles.status}>{this.getMessage()}</Text>
                </Fragment>
              )}
              {this.getStatus() === 'failed' && (
                <Fragment>
                  <Text style={styles.status}>{this.getMessage()}</Text>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.buttonRightBorder]}
                      onPress={() => this.props.signCancel()}
                      accessibilityTraits="button"
                      accessibilityComponentType="button"
                    >
                      <Text style={[styles.buttonText]}>Stäng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this.props.signRetry()}
                      accessibilityTraits="button"
                      accessibilityComponentType="button"
                    >
                      <Text
                        style={[styles.buttonText, styles.buttonTextIsPrimary]}
                      >
                        Försök igen
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Fragment>
              )}
            </View>
          </View>
        </Modal>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bankid: state.bankid,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signRetry: () =>
      dispatch({
        type: BANKID_SIGN,
      }),
    signCancel: () =>
      dispatch({
        type: BANKID_SIGN_CANCEL,
      }),
    dialogShown: () =>
      dispatch({
        type: BANKID_DIALOG_SHOWN,
      }),
    dialogDismissed: () =>
      dispatch({
        type: BANKID_DIALOG_DISMISSED,
      }),
  };
};

const DialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dialog);

export { DialogContainer as Dialog };

import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { types } from '../../../../hedvig-redux';
import { UploadingAnimation } from '../../../components/Animation';

const styles = StyleSheet.create({
  container: { height: 200, alignItems: 'center', justifyContent: 'center' },
});

class BankIdCollectInput extends React.Component {
  static propTypes = { startCollecting: PropTypes.func.isRequired };
  componentDidMount() {
    this.props.startCollecting(this.props.message.body.referenceId);
  }

  render() {
    return (
      <View style={styles.container}>
        <UploadingAnimation />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
  };
};

const mapDispatchToProps = (dispatch) => ({
  startCollecting: (referenceId) =>
    dispatch({
      type: types.DEPRECATED_BANKID_COLLECT,
      payload: { referenceId },
    }),
});

const BankIdCollectInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankIdCollectInput);

export default BankIdCollectInputContainer;

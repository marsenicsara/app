import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { types } from '../../../../hedvig-redux';

class ParagraphInput extends React.Component {
  static propTypes = {
    startPolling: PropTypes.func.isRequired,
    stopPolling: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.startPolling(this.props.message.header.pollingInterval);
  }

  componentDidUpdate() {
    this.props.startPolling(this.props.message.header.pollingInterval);
  }

  componentWillUnmount() {
    this.props.stopPolling();
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.chat.messages[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startPolling: (pollingInterval) =>
      dispatch({
        type: types.START_POLLING_MESSAGES,
        payload: { pollingInterval },
      }),
    stopPolling: () => {
      dispatch({ type: types.STOP_POLLING_MESSAGES, payload: {} });
    },
  };
};

const ParagraphInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ParagraphInput);

export default ParagraphInputContainer;

import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Lottie from 'lottie-react-native';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  avatar: { backgroundColor: colors.TRANSPARENT },
});

const Avatar = ({ avatar }) => {
  if (avatar.data) {
    const { width, height, data } = avatar;

    return (
      <Lottie
        style={[styles.avatar, { height, width }]}
        source={data}
        autoPlay
        loop={false}
      />
    );
  }
  return null;
};

Avatar.defaultProps = { avatar: {} };

Avatar.propTypes = {
  avatar: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.object,
  }),
};

const mapStateToProps = (state) => {
  if (state.chat.messages.length > 0) {
    let message = state.chat.messages[0];
    return {
      avatar: state.chat.avatars[message.header.avatarName] || {},
    };
  } else {
    return {
      avatar: {},
    };
  }
};

export default connect(
  mapStateToProps,
  undefined,
)(Avatar);

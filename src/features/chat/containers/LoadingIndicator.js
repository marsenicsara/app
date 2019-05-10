import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Lottie from 'lottie-react-native';

import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  innerAnimation: {
    backgroundColor: colors.TRANSPARENT,
  },
});

class LoadingIndicator extends React.Component {
  state = {
    fade: new Animated.Value(0),
  };
  componentDidMount() {
    Animated.timing(this.state.fade, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    if (this.props.loadingMessages && this.props.avatar.data) {
      return (
        <Animated.View
          style={{
            height: this.props.avatar.height,
            width: this.props.avatar.width,
            opacity: this.state.fade,
            marginBottom: 20,
          }}
        >
          <Lottie
            ref={(animation) => (animation ? animation.play() : null)}
            style={[
              styles.innerAnimation,
              {
                height: this.props.avatar.height,
                width: this.props.avatar.width,
              },
            ]}
            loop={true}
            source={this.props.avatar.data}
          />
        </Animated.View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  if (state.chat.messages.length > 0) {
    let message = state.chat.messages[0];
    return {
      loadingMessages: state.chat.loadingMessages,
      avatar: state.chat.avatars[message.header.loadingIndicator] || {},
    };
  } else {
    return {
      avatar: {},
    };
  }
};

const mapDispatchToProps = () => {
  return {};
};

const LoadingIndicatorContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoadingIndicator);

export default LoadingIndicatorContainer;

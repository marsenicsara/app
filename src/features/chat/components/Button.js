import React from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  View,
} from 'react-native';

import { colors } from '@hedviginsurance/brand';

const AnimatableTouchableHighlight = Animated.createAnimatedComponent(
  TouchableHighlight,
);

const styles = StyleSheet.create({
  buttonBase: {
    minHeight: 20,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  chatOptionButton: {
    borderColor: colors.PURPLE,
    marginBottom: 8,
  },
  buttonColorSelected: { backgroundColor: colors.PURPLE },
  buttonColorNotSelected: { backgroundColor: colors.WHITE },
  buttonHidden: { opacity: 0 },
  buttonText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 16,
    lineHeight: 20,
    backgroundColor: colors.TRANSPARENT,
  },
  buttonTextColorSelected: { color: colors.WHITE },
  buttonTextColorNotSelected: { color: colors.PURPLE },
  sendButton: { width: 30, height: 30, marginRight: 5, marginBottom: 5 },
  sendButtonLarge: { width: 40, height: 40 },
  editMessageButton: { width: 24, height: 24, alignSelf: 'flex-end' },
});

export class AnimatedSingleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    hidden: PropTypes.bool,
  };

  static defaultProps = {
    selected: false,
    disabled: false,
    hidden: false,
  };

  state = {
    slideAnim: new Animated.Value(300),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.spring(this.state.slideAnim, {
        delay: 100,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { title, selected, disabled, onPress, hidden } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[
          styles.buttonBase,
          styles.chatOptionButton,
          {
            transform: [{ translateX: this.state.slideAnim }],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
          hidden ? styles.buttonHidden : undefined,
        ]}
        accessibilityTraits="button"
        accessibilityComponentType="button"
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export class AnimatedMultipleSelectOptionButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
  };
  state = {
    slideAnim: new Animated.Value(250),
  };

  componentDidMount() {
    Animated.sequence([
      Animated.spring(this.state.slideAnim, {
        toValue: 0,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  render() {
    const { selected, title, onPress } = this.props;
    return (
      <AnimatableTouchableHighlight
        onPress={onPress}
        underlayColor="transparent"
        activeOpacity={0.5}
        style={[
          styles.buttonBase,
          styles.chatOptionButton,
          {
            transform: [
              {
                translateX: this.state.slideAnim,
              },
            ],
          },
          selected ? styles.buttonColorSelected : styles.buttonColorNotSelected,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            selected
              ? styles.buttonTextColorSelected
              : styles.buttonTextColorNotSelected,
          ]}
        >
          {title}
        </Text>
      </AnimatableTouchableHighlight>
    );
  }
}

export class SendButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
  };
  static _hitSlop = { top: 20, right: 20, bottom: 20, left: 20 };

  render() {
    const { onPress, disabled, size } = this.props;
    if (disabled) {
      return (
        <View>
          <Image
            source={require('../../../../assets/icons/chat/send_idle.png')}
            style={[
              styles.sendButton,
              size !== 'small' && styles.sendButtonLarge,
            ]}
          />
        </View>
      );
    }
    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityTraits="button"
        accessibilityLabel="Skicka"
        onPress={onPress}
        hitSlop={SendButton._hitSlop}
      >
        <Image
          source={require('../../../../assets/icons/chat/send.png')}
          style={[
            styles.sendButton,
            size !== 'small' && styles.sendButtonLarge,
          ]}
        />
      </TouchableOpacity>
    );
  }
}

export class EditMessageButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
  };

  static _hitSlop = { top: 24, right: 24, bottom: 24, left: 24 };

  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityTraits="button"
        accessibilityLabel="Redigera meddelande"
        onPress={onPress}
        hitSlop={EditMessageButton._hitSlop}
      >
        <Image
          source={require('../../../../assets/icons/chat/edit_last_message.png')}
          style={styles.editMessageButton}
        />
      </TouchableOpacity>
    );
  }
}

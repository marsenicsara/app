import React from 'react';
import PropTypes from 'prop-types';
import { Animated, View, StyleSheet, Text, TextInput } from 'react-native';

import { colors } from '@hedviginsurance/brand';

// Regular text messages

const styles = StyleSheet.create({
  rightAlignedOptions: {
    flexDirection: 'row-reverse',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginLeft: 5,
  },
  defaultMessageText: {
    color: colors.OFF_BLACK,
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    textAlign: 'left',
  },
  userMessageText: {
    color: colors.WHITE,
    fontSize: 16,
    fontFamily: 'CircularStd-Book',
    textAlign: 'left',
  },
  messageContainer: {
    flexDirection: 'row',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 20,
    maxWidth: '88%',
    backgroundColor: colors.WHITE,
    marginBottom: 8,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginRight: 8,
    marginLeft: 8,
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    alignSelf: 'stretch',
    height: 40,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: colors.WHITE,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 24,
    fontSize: 16,
    overflow: 'hidden',
  },
  optionsContainer: {
    marginBottom: 8,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  optionsContainerWrap: {
    flexDirection: 'row',
  },
  optionsContainerNoWrap: { flexDirection: 'column' },
  marginContainer: {
    marginRight: 16,
    marginBottom: 40,
    marginLeft: 16,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  heroMessage: {
    flexDirection: 'column',
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    borderRadius: 8,
    backgroundColor: colors.OFF_WHITE,
    marginBottom: 8,
    width: '98%',
  },
  userMessage: {
    marginBottom: 2,
    paddingTop: 8,
    paddingRight: 16,
    paddingBottom: 8,
    paddingLeft: 16,
    backgroundColor: colors.PURPLE,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userMessageWithMargin: { marginBottom: 8 },
  avatarContainer: { marginLeft: 15, marginBottom: 15 },
  datePickerResultRow: {
    marginRight: 8,
    marginBottom: 8,
    marginLeft: 8,
    flexDirection: 'row',
  },
  fakeTextInput: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    height: 40,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    marginRight: 8,
    backgroundColor: colors.WHITE,
    borderColor: colors.PURPLE,
    borderWidth: 1,
    borderRadius: 24,
  },
  fakeTextInputText: { fontSize: 16, color: colors.OFF_BLACK },
});

export class StyledDefaultMessageText extends React.Component {
  render() {
    return (
      <Text {...this.props} selectable style={styles.defaultMessageText} />
    );
  }
}

export class StyledDefaultUserMessageText extends React.Component {
  render() {
    return (
      <Text
        {...this.props}
        selectable
        style={[
          this.props.style,
          this.props.fromUser
            ? styles.userMessageText
            : styles.defaultMessageText,
        ]}
      />
    );
  }
}

export class AnimatedStyledChatMessage extends React.Component {
  state = {
    slideAnim: new Animated.Value(-100),
  };

  componentDidMount() {
    Animated.spring(this.state.slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.messageContainer,
          { transform: [{ translateX: this.state.slideAnim }] },
        ]}
        {...this.props}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export class StyledUserChatMessage extends React.Component {
  static propTypes = { withMargin: PropTypes.bool.isRequired };
  render() {
    const { withMargin, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.userMessage,
          withMargin ? styles.userMessageWithMargin : undefined,
        ]}
      />
    );
  }
}

export class StyledHedvigMessage extends React.Component {
  static propTypes = { withMargin: PropTypes.bool.isRequired };
  render() {
    const { withMargin, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.messageContainer,
          withMargin ? styles.userMessageWithMargin : undefined,
        ]}
      />
    );
  }
}

export class StyledHeroMessage extends React.Component {
  render() {
    return <View {...this.props} style={styles.heroMessage} />;
  }
}

export class StyledAvatarContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.avatarContainer} />;
  }
}

// Single select & multiple select

export class StyledMarginContainer extends React.Component {
  render() {
    const { wrap, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.marginContainer,
          wrap ? styles.optionsContainerWrap : styles.optionsContainerNoWrap,
        ]}
      />
    );
  }
}

export class StyledRightAlignedOptions extends React.Component {
  render() {
    return <View style={[styles.rightAlignedOptions]} {...this.props} />;
  }
}

// Multiple select

export class StyledOptionsContainer extends React.Component {
  render() {
    const { wrap, ...rest } = this.props;
    return (
      <View
        {...rest}
        style={[
          styles.optionsContainer,
          wrap ? styles.optionsContainerWrap : styles.optionsContainerNoWrap,
        ]}
      />
    );
  }
}

// Text input

export class StyledTextInputContainer extends React.Component {
  render() {
    return <View {...this.props} style={styles.textInputContainer} />;
  }
}

export class StyledTextInput extends React.Component {
  render() {
    return <TextInput {...this.props} style={styles.textInput} />;
  }
}

// Date input

export class StyledDatePickerResultRow extends React.Component {
  render() {
    return <View {...this.props} style={styles.datePickerResultRow} />;
  }
}

export class StyledFakeTextInput extends React.Component {
  render() {
    return <View {...this.props} style={styles.fakeTextInput} />;
  }
}

export class StyledFakeTextInputText extends React.Component {
  render() {
    return <Text {...this.props} style={styles.fakeTextInputText} />;
  }
}

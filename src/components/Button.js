/* global require */
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';
import {
  StyledButton,
  StyledDisabledButton,
  StyledButtonText,
} from './styles/button';
import { StyledDialogButton, StyledDialogButtonText } from './styles/dialog';
import { colors } from '@hedviginsurance/brand';

const styles = StyleSheet.create({
  animationButton: { backgroundColor: colors.TRANSPARENT },
  recordButton: { marginBottom: 8 },
});

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

export class TextButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableOpacity
        accessibilityComponentType="button"
        accessibilityTraits="button"
        onPress={onPress}
        hitSlop={hitSlop}
      >
        <StyledButtonText>{title}</StyledButtonText>
      </TouchableOpacity>
    );
  }
}

// Dialog

export class DialogButton extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    borderRight: PropTypes.bool,
  };
  static defaultProps = { borderRight: false };
  render() {
    const { title, onPress, borderRight } = this.props;
    return (
      <StyledDialogButton onPress={onPress} borderRight={borderRight}>
        <StyledDialogButtonText>{title}</StyledDialogButtonText>
      </StyledDialogButton>
    );
  }
}
// Icon buttons

class IconButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    width: PropTypes.number,
    size: PropTypes.string,
  };
  static defaultProps = {
    size: 'big',
    _ButtonComponent: StyledButton,
    style: {},
    onPress: () => {},
  };
  render() {
    const { iconModule, onPress, size, _ButtonComponent, style } = this.props;
    const width =
      this.props.width ||
      {
        small: 16,
        medium: 20,
        mediumBig: 24,
        big: 40,
        huge: 56,
      }[size];
    return (
      <_ButtonComponent onPress={onPress} hitSlop={hitSlop} style={style}>
        <Image source={iconModule} style={{ width: width, height: width }} />
      </_ButtonComponent>
    );
  }
}

class DisabledIconButton extends React.Component {
  render() {
    const { iconModule, size } = this.props;
    return (
      <IconButton
        iconModule={iconModule}
        size={size}
        _ButtonComponent={StyledDisabledButton}
      />
    );
  }
}

export class SendIconButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/chat/send.png')}
        onPress={onPress}
      />
    );
  }
}

export class ListNextButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/navigate_next.png')}
        onPress={onPress}
        size="mediumBig"
      />
    );
  }
}

export class DisabledListNextButton extends React.Component {
  render() {
    return (
      <DisabledIconButton
        iconModule={require('../../assets/icons/navigate_next.png')}
        size="mediumBig"
      />
    );
  }
}

export class DisabledCollapseButton extends React.Component {
  render() {
    return (
      <DisabledIconButton
        iconModule={require('../../assets/icons/collapse.png')}
        size="mediumBig"
      />
    );
  }
}

export class DisabledExpandButton extends React.Component {
  render() {
    return (
      <DisabledIconButton
        iconModule={require('../../assets/icons/expand.png')}
        size="mediumBig"
      />
    );
  }
}

export class NavigateBackButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/navigate_back.png')}
        onPress={onPress}
        size="mediumBig"
      />
    );
  }
}

export class XNavigateBackButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/close/close_black.png')}
        onPress={onPress}
        size="mediumBig"
      />
    );
  }
}

export class RecordButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/chat/record_audio.png')}
        onPress={onPress}
        size="huge"
        style={styles.recordButton}
      />
    );
  }
}

export class StopRecordingButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <IconButton
        iconModule={require('../../assets/icons/chat/stop_record_audio.png')}
        onPress={onPress}
        size="huge"
      />
    );
  }
}

// Animation buttons

class AnimationButton extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    width: PropTypes.number,
    size: PropTypes.string,
  };
  static defaultProps = { onPress: () => {}, _ButtonComponent: StyledButton };

  render() {
    const { animationModule, onPress, size, _ButtonComponent } = this.props;
    const width =
      this.props.width ||
      {
        small: 16,
        medium: 20,
        mediumBig: 24,
        big: 40,
        huge: 56,
      }[size];
    return (
      <_ButtonComponent onPress={onPress} hitSlop={hitSlop}>
        <Lottie
          ref={(animation) => {
            animation ? animation.play() : null;
          }}
          style={[styles.animationButton, { height: width, width }]}
          loop={true}
          source={animationModule}
        />
      </_ButtonComponent>
    );
  }
}

export class DisabledAnimationButton extends React.Component {
  render() {
    const { animationModule, width, size } = this.props;
    return (
      <AnimationButton
        animationModule={animationModule}
        width={width}
        size={size}
        _ButtonComponent={StyledDisabledButton}
      />
    );
  }
}

export class StopRecordingAnimationButton extends React.Component {
  static propTypes = { onPress: PropTypes.func.isRequired };
  render() {
    const { onPress } = this.props;
    return (
      <AnimationButton
        animationModule={require('../../assets/animations/hedvig_voice_recording_animation.json')}
        onPress={onPress}
        size="huge"
      />
    );
  }
}

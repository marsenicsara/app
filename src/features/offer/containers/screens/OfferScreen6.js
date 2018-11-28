import React from 'react';
import {
  Text,
  Image,
  View,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Lottie from 'lottie-react-native';

import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../../../services/DimensionSizes';

const animationModule = require('../../../../../assets/animations/claims_demo.json');
import { colors } from '@hedviginsurance/brand';

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: {
      [VerticalSizeClass.COMPACT]: 10,
      [VerticalSizeClass.REGULAR]: 25,
      [VerticalSizeClass.COMPACT]: 15,
    }[verticalSizeClass],
    fontFamily: 'CircularStd-Bold',
    fontSize: 23,
    lineHeight: 32,
    color: colors.OFF_BLACK,
    marginBottom: 0,
    textAlign: 'center',
  },
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
  },
  play: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: 'rgba(101, 30, 255, 1.0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    width: 35,
    height: 44,
    left: 6,
  },
  // Maintain aspect ratio for animation
  animationContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    height: viewportWidth * 1.22,
    width: viewportWidth * 0.74,
    ...Platform.select({
      android: {
        marginTop: 10,
        height: viewportWidth * 1.12,
        width: viewportWidth * 0.64,
      },
    }),
  },
});

const hitSlop = {
  top: 20,
  left: 20,
  bottom: 20,
  right: 20,
};

class OfferScreen extends React.Component {
  state = {
    isPlaying: false,
  };

  componentDidUpdate() {
    const { isActive } = this.props;
    if (!isActive) {
      if (this.state.isPlaying) {
        this.setState({
          isPlaying: false,
        });
      }
      this.animation.reset();
    }
  }

  play() {
    this.setState({
      isPlaying: true,
    });
    this.animation.play();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <SafeAreaView>
            <Text style={styles.header}>
              Så funkar det när
              {'\n'}
              du har en skada
            </Text>
          </SafeAreaView>
          <View style={styles.animationContainer}>
            {!this.state.isPlaying ? (
              <View style={styles.overlay}>
                <TouchableOpacity
                  style={styles.play}
                  hitSlop={hitSlop}
                  onPress={() => this.play()}
                  accessibilityComponentType="button"
                  accessibilityTraits="button"
                  accessibilityLabel="Spela upp demo"
                >
                  <Image
                    style={styles.playIcon}
                    source={require('../../../../../assets/icons/offer/offer-play.png')}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <Lottie
              ref={(animation) => {
                this.animation = animation;
              }}
              style={styles.animation}
              loop={true}
              autoplay={false}
              source={animationModule}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default OfferScreen;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {
  horizontalSizeClass,
  verticalSizeClass,
  HorizontalSizeClass,
  VerticalSizeClass,
} from 'src/services/DimensionSizes';
import { OFFER_CHECKOUT } from '../../state/actions';
import { Dialog } from '../../../bankid/Dialog';

import { colors } from '@hedviginsurance/brand';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 80,
  },
  view: {
    flex: 1,
    alignItems: 'center',
  },
  priceContainer: {
    marginTop: {
      [VerticalSizeClass.SPACIOUS]: 50,
      [VerticalSizeClass.REGULAR]: 40,
      [VerticalSizeClass.COMPACT]: 30,
    }[verticalSizeClass],
  },
  priceBackground: {
    width: 127,
    height: 127,
    justifyContent: 'center',
  },
  priceAmount: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Book',
    fontSize: 43,
    lineHeight: 44,
    color: '#141132',
    position: 'relative',
    top: 5,
  },
  priceLabel: {
    textAlign: 'center',
    fontFamily: 'CircularStd-Book',
    fontSize: 17,
    lineHeight: 20,
    color: '#141132',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 60,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: colors.WHITE,
    borderRadius: 100,
    marginBottom: 36,
  },
  buttonLabel: {
    position: 'relative',
    top: -1,
    color: '#141132',
    fontSize: 19,
    textAlign: 'center',
    fontFamily: 'CircularStd-Book',
    textAlignVertical: 'center',
  },
  buttonIcon: {
    marginLeft: 15,
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  checkWrapper: {
    flex: 1,
    marginTop: {
      [VerticalSizeClass.SPACIOUS]: 70,
      [VerticalSizeClass.REGULAR]: 50,
      [VerticalSizeClass.COMPACT]: 30,
    }[verticalSizeClass],
    width: {
      [HorizontalSizeClass.SPACIOUS]: 330,
      [HorizontalSizeClass.REGULAR]: 320,
      [HorizontalSizeClass.COMPACT]: '85%',
    }[horizontalSizeClass],
  },
  check: {
    flexDirection: 'row',
    position: 'relative',
    marginBottom: {
      [HorizontalSizeClass.SPACIOUS]: 40,
      [HorizontalSizeClass.REGULAR]: 40,
      [HorizontalSizeClass.COMPACT]: 35,
    }[horizontalSizeClass],
    alignItems: 'center',
  },
  checkIcon: {
    width: 30,
    height: 30,
    marginRight: 17,
  },
  checkLabel: {
    flex: 1,
    fontFamily: 'CircularStd-Bold',
    fontSize: 21,
    lineHeight: 24,
    color: colors.WHITE,
  },
  screenBackground: {
    height: viewportHeight,
    width: viewportWidth,
  },
});

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

class OfferScreen extends React.Component {
  static propTypes = {
    isCurrentlySigning: PropTypes.bool, // Appears to not be a thing
    checkout: PropTypes.func.isRequired,
  };
  state = {
    springTranslate: new Animated.Value(110),
  };

  componentDidUpdate() {
    const { isActive } = this.props;
    const toValue = isActive ? 0 : 110;
    const delay = isActive ? 400 : 0;

    Animated.spring(this.state.springTranslate, {
      toValue,
      delay,
      bounciness: 1,
      speed: 1,
      useNativeDriver: true,
    }).start();
  }

  _checkout = () => {
    if (!this.props.isCurrentlySigning) {
      this.props.checkout();
    }
  };

  render() {
    const { insuredAtOtherCompany } = this.props.insurance; // Appears to be dead code

    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.screenBackground}
          resizeMode={'cover'}
          source={require('../../../../../assets/offer/unbroken-bg.png')}
        >
          <ScrollView style={styles.scroll}>
            <View style={styles.scrollContent}>
              <SafeAreaView style={styles.view}>
                <View style={styles.priceContainer}>
                  <ImageBackground
                    style={styles.priceBackground}
                    resizeMode={'cover'}
                    source={require('../../../../../assets/offer/offer-price-bg.png')}
                  >
                    <View>
                      <Text style={styles.priceAmount}>
                        {this.props.insurance.newTotalPrice}
                      </Text>
                      <Text style={styles.priceLabel}>kr/mån</Text>
                    </View>
                  </ImageBackground>
                </View>

                <View style={styles.checkWrapper}>
                  <View style={styles.check}>
                    <Image
                      style={styles.checkIcon}
                      source={require('../../../../../assets/icons/offer/offer-check.png')}
                    />
                    <Text style={styles.checkLabel}>Blixtsnabb hjälp</Text>
                  </View>
                  <View style={styles.check}>
                    <Image
                      style={styles.checkIcon}
                      source={require('../../../../../assets/icons/offer/offer-check.png')}
                    />
                    <Text style={styles.checkLabel}>
                      Blixtsnabb utbetalning
                    </Text>
                  </View>
                  <View style={styles.check}>
                    <Image
                      style={styles.checkIcon}
                      source={require('../../../../../assets/icons/offer/offer-check.png')}
                    />
                    <Text style={styles.checkLabel}>Ingen bindningstid</Text>
                  </View>
                  <View style={styles.check}>
                    <Image
                      style={styles.checkIcon}
                      source={require('../../../../../assets/icons/offer/offer-check.png')}
                    />
                    <Text style={styles.checkLabel}>
                      Överskottet till välgörenhet
                    </Text>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </ScrollView>

          <Animated.View
            style={[
              styles.checkoutContainer,
              { transform: [{ translateY: this.state.springTranslate }] },
            ]}
          >
            <TouchableOpacity
              onPress={this._checkout}
              hitSlop={hitSlop}
              style={styles.button}
              accessibilityTraits="button"
              accessibilityComponentType="button"
            >
              <Text style={styles.buttonLabel}>
                {insuredAtOtherCompany ? 'Byt till Hedvig' : 'Skaffa Hedvig'}
              </Text>
              <Image
                style={styles.buttonIcon}
                width={27}
                height={26}
                source={require('../../../../../assets/icons/bankid/bankid-logo-dark.png')}
              />
            </TouchableOpacity>
          </Animated.View>
        </ImageBackground>
        <Dialog />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: () => {
      dispatch({
        type: OFFER_CHECKOUT,
      });
    },
  };
};

const OfferContainer = connect(
  null,
  mapDispatchToProps,
)(OfferScreen);

export default OfferContainer;

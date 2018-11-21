import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'react-native-navigation';
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Linking,
} from 'react-native';
import ImageResizeMode from 'react-native/Libraries/Image/ImageResizeMode';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';

import {
  verticalSizeClass,
  horizontalSizeClass,
  VerticalSizeClass,
  HorizontalSizeClass,
} from '../../services/DimensionSizes';

import {
  MARKETING_SET_ACTIVE_SCREEN,
  MARKETING_CHAT_START,
  MARKETING_CHAT_LOGIN,
} from './actions';
import * as marketingSelectors from './selectors';
import * as analyticsSelectors from '../analytics/selectors';

import { CHAT_SCREEN } from '../../navigation/screens/chat';
import { colors } from '@hedviginsurance/brand';
import { DebugShortcut } from 'src/components/DebugShortcut';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const slideStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
  },
  figure: {
    flex: 1,
    width: viewportWidth,
    alignItems: 'center',
  },
  caption: {
    fontFamily: 'CircularStd-Bold',
    fontSize: {
      [HorizontalSizeClass.SPACIOUS]: 22,
      [HorizontalSizeClass.REGULAR]: 20,
      [HorizontalSizeClass.COMPACT]: 16,
    }[horizontalSizeClass],
    lineHeight: {
      [HorizontalSizeClass.SPACIOUS]: 33,
      [HorizontalSizeClass.REGULAR]: 26,
      [HorizontalSizeClass.COMPACT]: 22,
    }[horizontalSizeClass],
    textAlign: 'center',
    color: colors.OFF_BLACK,
    width: viewportWidth,
    paddingTop: {
      [VerticalSizeClass.SPACIOUS]: 35,
      [VerticalSizeClass.REGULAR]: 30,
      [VerticalSizeClass.COMPACT]: 20,
    }[verticalSizeClass],
    paddingBottom: {
      [VerticalSizeClass.SPACIOUS]: 180,
      [VerticalSizeClass.REGULAR]: 165,
      [VerticalSizeClass.COMPACT]: 160,
    }[verticalSizeClass],
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK,
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
});

class Slide extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  };
  render() {
    const { title, children } = this.props;
    return (
      <View style={slideStyles.container}>
        <View style={slideStyles.figure}>{children}</View>
        <Text numberOfLines={2} style={slideStyles.caption}>
          {title}
        </Text>
      </View>
    );
  }
}

const slideImageWidth = viewportWidth - 60;

const slideImageStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: slideImageWidth,
    position: 'relative',
    top: {
      [VerticalSizeClass.SPACIOUS]: 90,
      [VerticalSizeClass.REGULAR]: 30,
      [VerticalSizeClass.COMPACT]: 18,
    }[verticalSizeClass],
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: {
      [VerticalSizeClass.SPACIOUS]: 0,
      [VerticalSizeClass.REGULAR]: 0,
      [VerticalSizeClass.COMPACT]: -30,
    }[verticalSizeClass],
    left: 0,
    right: 0,
    bottom: 0,
    width: slideImageWidth,
    resizeMode: ImageResizeMode.contain,
  },
});

class SlideImage extends React.Component {
  static propTypes = {
    imageSource: PropTypes.number.isRequired,
  };

  render() {
    const { imageSource } = this.props;
    return (
      <View style={slideImageStyles.container}>
        <Image
          source={imageSource}
          style={slideImageStyles.image}
          resizeMethod="scale"
        />
      </View>
    );
  }
}

const marketingCarouselStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 0,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
  },
  swiperContainer: { flex: 1 },
  background: {
    width: viewportWidth,
    height: viewportHeight,
    backgroundColor: colors.PURPLE,
    alignItems: 'center',
  },
  hedvigLogo: {
    width: 96,
    height: 30,
    position: 'absolute',
    top: {
      [VerticalSizeClass.SPACIOUS]: 46,
      [VerticalSizeClass.REGULAR]: 32,
      [VerticalSizeClass.COMPACT]: 24,
    }[verticalSizeClass],
  },
  introHeader: {
    position: 'absolute',
    fontSize: 56,
    color: colors.WHITE,
    fontFamily: 'SoRay-ExtraBold',
    textAlign: 'center',
    top: {
      [VerticalSizeClass.SPACIOUS]: 144,
      [VerticalSizeClass.REGULAR]: 114,
      [VerticalSizeClass.COMPACT]: 84,
    }[verticalSizeClass],
  },
  swiperDot: {
    backgroundColor: '#dcdbdc',
    width: 7.5,
    height: 7.5,
    borderRadius: 7.5,
    marginLeft: 5.5,
    marginRight: 5.5,
  },
  swiperDotIsFirst: {
    backgroundColor: colors.WHITE,
  },
  swiperDotIsActive: {
    backgroundColor: colors.PURPLE,
    width: 7.5,
    height: 7.5,
    borderRadius: 7.5,
    marginLeft: 5.5,
    marginRight: 5.5,
  },
  swiperPagination: {
    bottom: {
      [VerticalSizeClass.SPACIOUS]: 25,
      [VerticalSizeClass.REGULAR]: 18,
      [VerticalSizeClass.COMPACT]: 18,
    }[verticalSizeClass],
  },
  slideOneContainer: {
    flex: 1,
    alignItems: 'center',
  },
  slideTwoContainer: {
    flex: 1,
    backgroundColor: colors.BLACK_PURPLE,
  },
  slideThreeContainer: {
    flex: 1,
    backgroundColor: colors.PURPLE,
  },
  slideFourContainer: {
    flex: 1,
    backgroundColor: '#FF8A80',
  },
  slideFourInnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideFourImage: {
    width: 132,
    height: 129,
    resizeMode: ImageResizeMode.contain,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: viewportWidth,
    paddingBottom: {
      [VerticalSizeClass.SPACIOUS]: 30,
      [VerticalSizeClass.REGULAR]: 18,
      [VerticalSizeClass.COMPACT]: 18,
    }[verticalSizeClass],
  },
  footerCtaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    maxWidth: viewportWidth * 0.7,
    minWidth: 250,
    height: 60,
    marginBottom: 18,
    padding: 0,
    backgroundColor: colors.TURQUOISE,
    borderWidth: 0,
    borderRadius: 30,
  },
  footerCtaButtonIsFirst: {
    backgroundColor: colors.WHITE,
  },
  footerCtaButtonText: {
    fontSize: 21,
    fontFamily: 'CircularStd-Book',
    textAlignVertical: 'center',
    textAlign: 'center',
    color: colors.WHITE,
  },
  footerCtaButtonTextIsFirst: {
    color: '#141033',
  },
  footerLoginContainer: {
    marginTop: 0,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  footerLoginText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: colors.DARK_GRAY,
    marginRight: 8,
  },
  footerLoginTextIsFirst: {
    color: colors.WHITE,
  },
  footerPrivacyText: {
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: colors.WHITE,
    marginRight: 8,
  },
  footerLoginCta: {
    fontFamily: 'CircularStd-Book',
    fontSize: 18,
    lineHeight: 20,
    height: 20,
    color: colors.PURPLE,
  },
});

const NO_STYLE = {};

export default class MarketingCarousel extends React.Component {
  static propTypes = {
    activeMarketingScreenIndex: PropTypes.number.isRequired,
    setActiveMarketingScreen: PropTypes.func.isRequired,
    startChat: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
  };

  _privacyLinkClick = () => {
    Linking.openURL('https://www.hedvig.com/privacy/');
  };

  handleCtaClick = () => {
    const {
      activeMarketingScreenIndex,
      startChat,
      orderId,
      componentId,
    } = this.props;

    if (activeMarketingScreenIndex === 3) {
      Navigation.setStackRoot(componentId, CHAT_SCREEN);
      startChat(orderId);
    } else {
      if (!this.swiper) {
        return;
      }
      this.swiper.scrollBy(1);
    }
  };

  login = () => {
    const { login, orderId, componentId } = this.props;

    Navigation.setStackRoot(componentId, CHAT_SCREEN);
    login(orderId);
  };

  setActiveMarketingScreen = (index) => {
    const { setActiveMarketingScreen, orderId } = this.props;
    setActiveMarketingScreen(index, orderId);
  };

  render() {
    const { activeMarketingScreenIndex } = this.props;
    const isFirst = activeMarketingScreenIndex === 0;
    const isLast = activeMarketingScreenIndex === 3;

    return (
      <View style={marketingCarouselStyles.container}>
        <View style={marketingCarouselStyles.swiperContainer}>
          <Swiper
            ref={(swiper) => (this.swiper = swiper)}
            style={NO_STYLE}
            index={0}
            onIndexChanged={this.setActiveMarketingScreen}
            dot={
              <View key="dot">
                <View
                  style={[
                    marketingCarouselStyles.swiperDot,
                    isFirst && marketingCarouselStyles.swiperDotIsFirst,
                  ]}
                />
              </View>
            }
            activeDot={
              <View key="activeDot">
                <View style={marketingCarouselStyles.swiperDotIsActive} />
              </View>
            }
            paginationStyle={marketingCarouselStyles.swiperPagination}
            loop={false}
          >
            <View style={marketingCarouselStyles.slideOneContainer}>
              <ImageBackground
                style={marketingCarouselStyles.background}
                resizeMode="cover"
                source={require('../../../assets/offer/hero/intro-2.png')}
              >
                <DebugShortcut componentId={this.props.componentId}>
                  <Image
                    source={require('../../../assets/identity/hedvig_wordmark/hedvig_wordmark_white.png')}
                    style={marketingCarouselStyles.hedvigLogo}
                  />
                </DebugShortcut>
                <Text style={marketingCarouselStyles.introHeader}>
                  Hjälp när du behöver det
                </Text>
              </ImageBackground>
            </View>
            <View style={marketingCarouselStyles.slideTwoContainer}>
              <Slide title="Hedvig är en ny sorts hemförsäkring för dig som bor i lägenhet">
                <SlideImage
                  imageSource={require('../../../assets/onboarding/app-marketing-screen1.png')}
                />
              </Slide>
            </View>
            <View style={marketingCarouselStyles.slideThreeContainer}>
              <Slide title={'Få hjälp på sekunder och\nersättning på minuter'}>
                <SlideImage
                  imageSource={require('../../../assets/onboarding/app-marketing-screen2.png')}
                />
              </Slide>
            </View>
            <View style={marketingCarouselStyles.slideFourContainer}>
              <Slide
                title={'Byggd på modern teknik,\nsunt förnuft och stort hjärta'}
              >
                <View style={marketingCarouselStyles.slideFourInnerContainer}>
                  <Image
                    source={require('../../../assets/onboarding/heart.png')}
                    style={marketingCarouselStyles.slideFourImage}
                    resizeMethod="scale"
                  />
                </View>
              </Slide>
            </View>
          </Swiper>
        </View>

        <View
          style={marketingCarouselStyles.footerContainer}
          key="marketing-footer-container"
        >
          <View key="marketing-footer">
            {isFirst && (
              <TouchableOpacity
                key="marketing-footer-policy"
                style={marketingCarouselStyles.footerLoginContainer}
                onPress={this._privacyLinkClick}
                accessibilityTraits="link"
                accessibilityComponentType="button"
              >
                <Text style={marketingCarouselStyles.footerPrivacyText}>
                  Om dina personuppgifter
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              key="marketing-footer-cta"
              onPress={this.handleCtaClick}
              accessibilityTraits="button"
              accessibilityComponentType="button"
              style={[
                marketingCarouselStyles.footerCtaButton,
                isFirst && marketingCarouselStyles.footerCtaButtonIsFirst,
              ]}
            >
              <Text
                numberOfLines={1}
                style={[
                  marketingCarouselStyles.footerCtaButtonText,
                  isFirst && marketingCarouselStyles.footerCtaButtonTextIsFirst,
                ]}
              >
                {isLast ? 'Säg hej till Hedvig' : 'Gå vidare'}
              </Text>
            </TouchableOpacity>
            <View
              style={marketingCarouselStyles.footerLoginContainer}
              key="marketing-footer-login"
            >
              <View>
                <Text
                  style={[
                    marketingCarouselStyles.footerLoginText,
                    isFirst && marketingCarouselStyles.footerLoginTextIsFirst,
                  ]}
                >
                  Redan medlem?
                </Text>
              </View>
              <TouchableOpacity
                accessibilityTraits="link"
                accessibilityComponentType="button"
                onPress={this.login}
              >
                <Text style={marketingCarouselStyles.footerLoginCta}>
                  Logga in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeMarketingScreenIndex: marketingSelectors.getActiveMarketingScreenIndex(
      state,
    ),
    orderId: analyticsSelectors.getOrderId(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (orderId) => {
      dispatch({
        type: MARKETING_CHAT_LOGIN,
        analytics: { order_id: orderId },
      });
    },
    startChat: (orderId) => {
      dispatch({
        type: MARKETING_CHAT_START,
        analytics: { order_id: orderId },
      });
    },
    setActiveMarketingScreen: (index, orderId) => {
      return dispatch({
        type: MARKETING_SET_ACTIVE_SCREEN,
        payload: { index },
        analytics: { order_id: orderId },
      });
    },
  };
};

const ConnectedMarketingCarousel = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarketingCarousel);

export { ConnectedMarketingCarousel as MarketingCarousel };

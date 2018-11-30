import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Platform,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import debounce from 'debounce';

import { insuranceActions, eventActions } from '../../../hedvig-redux';
import {
  TRACK_OFFER_OPENED,
  TRACK_OFFER_CLOSED,
  TRACK_OFFER_STEP_VIEWED,
  TRACK_OFFER_STEP_COMPLETED,
} from '../../features/analytics/actions';

import { IS_VIEWING_OFFER } from '../../constants';
import { Loader } from '../../components/Loader';
import { PerilsDialog } from './containers/PerilsDialog';
import { OFFER_SET_ACTIVE_SCREEN } from './state/actions';

import OfferScreen1 from './containers/screens/OfferScreen1';
import OfferScreen2 from './containers/screens/OfferScreen2';
import OfferScreen3 from './containers/screens/OfferScreen3';
import OfferScreen4 from './containers/screens/OfferScreen4';
import OfferScreen5 from './containers/screens/OfferScreen5';
import OfferScreen6 from './containers/screens/OfferScreen6';
import OfferScreen7 from './containers/screens/OfferScreen7';
import OfferScreen8 from './containers/screens/OfferScreen8';

import {
  verticalSizeClass,
  VerticalSizeClass,
} from '../../services/DimensionSizes';

import { colors } from '@hedviginsurance/brand';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window',
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiperContainer: { flex: 1 },
  closeOffer: {
    position: 'absolute',
    top: ifIphoneX(40, 20),
    left: 17,
    zIndex: 2,
  },
  closeOfferImage: {
    width: 26,
    height: 26,
    ...Platform.select({ android: { marginTop: 17 } }),
  },
  buttonWrapperStyle: {
    backgroundColor: colors.TRANSPARENT,
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  swiperDot: {
    backgroundColor: colors.LIGHT_GRAY,
    width: 7.5,
    height: 7.5,
    borderRadius: 7.5,
    marginLeft: 5.5,
    marginRight: 5.5,
  },
  swiperDotIsActive: {
    backgroundColor: colors.TURQUOISE,
    width: 7.5,
    height: 7.5,
    borderRadius: 7.5,
    marginLeft: 5.5,
    marginRight: 5.5,
  },
  swiperPagination: {
    ...ifIphoneX({
      bottom: 30,
    }),
    bottom: {
      [VerticalSizeClass.COMPACT]: 18,
      [VerticalSizeClass.REGULAR]: 15,
      [VerticalSizeClass.COMPACT]: 15,
    }[verticalSizeClass],
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#31e8b7',
    borderRadius: 30,
    height: 47,
    zIndex: 200,
    elevation: 1,
    ...ifIphoneX({
      marginBottom: 40,
    }),
    marginBottom: {
      [VerticalSizeClass.COMPACT]: 29,
      [VerticalSizeClass.REGULAR]: 50,
      [VerticalSizeClass.COMPACT]: 26,
    }[verticalSizeClass],
    ...Platform.select({
      android: {
        marginBottom: 50,
      },
    }),
  },
  buttonIsFirst: {
    backgroundColor: colors.WHITE,
  },
  label: {
    position: 'relative',
    top: -1,
    color: colors.WHITE,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'CircularStd-Book',
    textAlignVertical: 'center',
  },
  labelIsFirst: {
    color: '#141132',
  },
  icon: {
    marginLeft: 10,
  },
});

const hitSlop = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};

class OfferSwiper extends React.Component {
  constructor(props) {
    super(props);

    this.trackOfferStepCompleted = debounce(props.trackOfferStepCompleted, 500);
    this.trackOfferStepViewed = debounce(props.trackOfferStepViewed, 500);
  }
  componentDidMount() {
    this.props.getInsurance();
    // Routing to Offer view from BaseRouter when
    // the app has been force closed and lost its state
    AsyncStorage.setItem(IS_VIEWING_OFFER, 'true');

    const { orderId } = this.props.analytics;
    this.props.trackOfferOpen(this.props.insurance.newTotalPrice, orderId);
    this.props.trackOfferStepViewed(this.props.activeOfferScreenIndex, orderId);

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    AsyncStorage.removeItem(IS_VIEWING_OFFER);
  }

  onBackPress = () => {
    const activeIndex = this.props.activeOfferScreenIndex;
    if (activeIndex === 0) {
      this._closeOffer();
      return true;
    }
    if (this.swiper) {
      this.swiper.scrollBy(-1);
    }
    return true;
  };

  componentDidUpdate(prevProps) {
    const { orderId } = this.props.analytics;
    if (
      this.props.activeOfferScreenIndex !== prevProps.activeOfferScreenIndex
    ) {
      this.trackOfferStepCompleted(prevProps.activeOfferScreenIndex, orderId);
      this.trackOfferStepViewed(this.props.activeOfferScreenIndex, orderId);
    }
  }

  hasLoaded(insurance) {
    // WARNING: Change this to loading state based on the request or something
    // more robust
    return insurance.newTotalPrice;
  }

  _closeOffer = () => {
    Navigation.dismissModal(this.props.componentId);
    this.props.closeOffer(this.props.analytics.orderId);
  };

  _setActiveOfferScreen = (index) => {
    this.props.setActiveOfferScreen(index);
  };

  render() {
    const { insurance } = this.props;
    if (!this.hasLoaded(insurance)) {
      return <Loader />;
    }

    const screens = [
      OfferScreen1,
      OfferScreen2,
      OfferScreen3,
      OfferScreen4,
      OfferScreen5,
      OfferScreen6,
    ];
    if (insurance.insuredAtOtherCompany) {
      screens.push(OfferScreen7);
    }
    screens.push(OfferScreen8);
    const { activeOfferScreenIndex } = this.props;
    const isLast = activeOfferScreenIndex === screens.length - 1;
    const isFirst = activeOfferScreenIndex === 0;

    return (
      <View style={styles.container}>
        <View style={styles.swiperContainer}>
          {activeOfferScreenIndex === 0 ? (
            <View style={styles.closeOffer}>
              <TouchableOpacity
                accessibilityTraits="button"
                accessibilityComponentType="button"
                accessibilityLabel="Stäng erbjudandet"
                onPress={this._closeOffer}
                hitSlop={hitSlop}
              >
                <Image
                  source={require('../../../assets/icons/close/close_white.png')}
                  style={styles.closeOfferImage}
                />
              </TouchableOpacity>
            </View>
          ) : null}
          <Swiper
            ref={(ref) => (this.swiper = ref)}
            style={{ paddingTop: 8 }} // This is undefined, rofl
            loop={false}
            showsButtons={!isLast}
            showsPagination={!isLast && !isFirst}
            buttonWrapperStyle={styles.buttonWrapperStyle}
            dot={
              <View key="dot">
                <View style={styles.swiperDot} />
              </View>
            }
            activeDot={
              <View key="activeDot">
                <View style={styles.swiperDotIsActive} />
              </View>
            }
            paginationStyle={styles.swiperPagination}
            onIndexChanged={this._setActiveOfferScreen}
            nextButton={
              <View key="nextButton">
                <View style={[styles.button, isFirst && styles.buttonIsFirst]}>
                  <Text style={[styles.label, isFirst && styles.labelIsFirst]}>
                    {isFirst ? 'Berätta mer' : 'Gå vidare'}
                  </Text>
                  {!isFirst && (
                    <Image
                      style={styles.icon}
                      source={require('../../../assets/icons/offer/offer-progress-arrow.png')}
                    />
                  )}
                </View>
              </View>
            }
            prevButton={<View key="prevButton" />}
            width={viewportWidth}
            height={viewportHeight}
            containerStyle={{}}
          >
            {screens.map((Screen, index) => {
              const isActive = activeOfferScreenIndex === index;
              return (
                <Screen isActive={isActive} insurance={insurance} key={index} />
              );
            })}
          </Swiper>
        </View>
        <PerilsDialog />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { insurance, analytics, offer } = state;
  const { activeOfferScreenIndex } = offer;
  return {
    insurance,
    analytics,
    activeOfferScreenIndex,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getInsurance: () => dispatch(insuranceActions.getInsurance()),
    setActiveOfferScreen: (index) => {
      return dispatch({ type: OFFER_SET_ACTIVE_SCREEN, payload: { index } });
    },
    closeOffer: (orderId) => {
      dispatch({
        type: TRACK_OFFER_CLOSED,
        payload: {
          order_id: orderId,
        },
      });
      dispatch(
        eventActions.event(
          {
            type: 'MODAL_CLOSED',
            value: 'quote',
          },
          {
            getMessagesAfter: true,
            showLoadingIndicator: true,
          },
        ),
      );
    },
    navigate: (params) => ownProps.navigation.navigate(params),
    trackOfferOpen: (pricePerMonth, orderId) =>
      dispatch({
        type: TRACK_OFFER_OPENED,
        payload: {
          revenue: pricePerMonth,
          currency: 'SEK',
          order_id: orderId,
        },
      }),
    trackOfferStepViewed: (step, orderId) =>
      dispatch({
        type: TRACK_OFFER_STEP_VIEWED,
        payload: { step, order_id: orderId },
      }),
    trackOfferStepCompleted: (step, orderId) =>
      dispatch({
        type: TRACK_OFFER_STEP_COMPLETED,
        payload: { step, order_id: orderId },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OfferSwiper);

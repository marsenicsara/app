import { AsyncStorage, Platform, NativeModules } from 'react-native';
import { call, takeLatest, take, put, select } from 'redux-saga/effects';
import { Navigation } from 'react-native-navigation';
import firebase from 'react-native-firebase';

import { chatActions } from '../../../../hedvig-redux';
import { TRACK_OFFER_SIGNED } from '../../../features/analytics/actions';
import { BANKID_SIGN, BANKID_SIGN_COMPLETE } from '../../bankid/actions';
import { OFFER_CHECKOUT } from './actions';

import { getChatLayout } from 'src/navigation/layouts/chatLayout';
import { userDidSign } from 'src/navigation/native-routing';

const Analytics = Platform.OS === 'ios' ? firebase.analytics() : {};

const handleCheckout = function*() {
  yield put({ type: BANKID_SIGN });
  yield take(BANKID_SIGN_COMPLETE);

  const { conversation, insurance, analytics } = yield select();
  const { intent } = conversation;
  yield put(chatActions.getMessages({ intent }));

  if (Platform.OS === 'ios') {
    Navigation.setRoot(getChatLayout());
  } else {
    NativeModules.ActivityStarter.navigateToChatFromOffer();
  }

  userDidSign();

  if (Platform.OS === 'ios') {
    Analytics.logEvent('ecommerce_purchase', {
      transaction_id: analytics.orderId,
      value: insurance.currentTotalPrice,
      currency: 'SEK',
    });
  } else {
    // TODO Pass this down to our native code where we track it ourselves
    //NativeModules.
  }

  yield put({
    type: TRACK_OFFER_SIGNED,
    payload: {
      affiliation: 'hedvig in-app sign',
      revenue: insurance.currentTotalPrice,
      order_id: analytics.orderId,
      currency: 'SEK',
    },
  });
  yield call(AsyncStorage.removeItem, '@hedvig:isViewingOffer');
};

const handleCheckoutSaga = function*() {
  yield takeLatest(OFFER_CHECKOUT, handleCheckout);
};

export { handleCheckoutSaga };

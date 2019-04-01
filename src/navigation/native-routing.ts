import {
  NativeEventEmitter,
  NativeModules,
  AsyncStorage,
  Platform,
  EmitterSubscription,
} from 'react-native';

import { SEEN_MARKETING_CAROUSEL_KEY } from 'src/constants';
import { chatScreen } from './screens/chat';

import { Navigation } from 'react-native-navigation';
import { Store } from 'src/setupApp';
import { chatActions } from 'hedvig-redux';
import { client } from 'src/graphql/client';
import { deleteToken } from 'src/graphql/context';
import { getMarketingLayout } from './layouts/marketingLayout';

let openFreeTextChatListener: EmitterSubscription | null = null;
let clearDirectDebitStatusListener: EmitterSubscription | null = null;
let marketingResultListener: EmitterSubscription | null = null;
let logoutListener: EmitterSubscription | null = null;

export const setupNativeRouting = () => {
  const nativeRoutingEvents = new NativeEventEmitter(
    NativeModules.NativeRouting,
  );

  if (marketingResultListener !== null) {
    marketingResultListener.remove();
  }
  marketingResultListener = nativeRoutingEvents.addListener('NativeRoutingMarketingResult', (event) => {
    AsyncStorage.setItem(SEEN_MARKETING_CAROUSEL_KEY, 'true');
    if (Platform.OS === 'ios') {
      Navigation.push(event.componentId, chatScreen(event.marketingResult));
    } else if (Platform.OS === 'android') {
      Navigation.setStackRoot(
        event.componentId,
        chatScreen(event.marketingResult),
      );
    }
  });

  if (clearDirectDebitStatusListener !== null) {
    clearDirectDebitStatusListener.remove();
  }
  clearDirectDebitStatusListener = nativeRoutingEvents.addListener('NativeRoutingClearDirectDebitStatus', () => {
    client.reFetchObservableQueries();
  });

  if (openFreeTextChatListener !== null) {
    openFreeTextChatListener.remove();
  }
  openFreeTextChatListener = nativeRoutingEvents.addListener('NativeRoutingOpenFreeTextChat', () => {
    Store.dispatch(
      chatActions.apiAndNavigateToChat({
        method: 'POST',
        url: '/v2/app/fabTrigger/CHAT',
        SUCCESS: 'INITIATED_CHAT_MAIN',
      }),
    );
  });

  if (Platform.OS === 'android') {
    if (logoutListener !== null) {
      logoutListener.remove()
    }
    logoutListener = nativeRoutingEvents.addListener('NativeRoutingLogout', () => {
      deleteToken();
      Store.dispatch({ type: 'DELETE_TOKEN' })
      Store.dispatch({ type: 'DELETE_TRACKING_ID' })
      Store.dispatch({ type: 'AUTHENTICATE' })
      AsyncStorage.multiRemove([
        '@hedvig:alreadySeenMarketingCarousel',
        '@hedvig:token'
      ])
        .then(() => client.clearStore())
        .then(() => {
          // @ts-ignore
          Navigation.setRoot(getMarketingLayout());
        })
    });
  }
};

export const appHasLoaded = () => {
  NativeModules.NativeRouting.appHasLoaded();
};

export const userDidSign = () => {
  NativeModules.NativeRouting.userDidSign();
};

export const registerExternalComponentId = (
  componentId: String,
  componentName: String,
) => {
  NativeModules.NativeRouting.registerExternalComponentId(
    componentId,
    componentName,
  );
};

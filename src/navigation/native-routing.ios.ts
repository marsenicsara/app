import { getChatLayout } from './layouts/chatLayout';
import { NativeEventEmitter, NativeModules, AsyncStorage } from 'react-native';
import { setLayout } from './layouts/setLayout';

import { SEEN_MARKETING_CAROUSEL_KEY } from 'src/constants';

export const setupNativeRouting = () => {
  const nativeRoutingEvents = new NativeEventEmitter(
    NativeModules.NativeRouting,
  );

  nativeRoutingEvents.addListener('NativeRoutingMarketingResult', () => {
    AsyncStorage.setItem(SEEN_MARKETING_CAROUSEL_KEY, 'true');
    setLayout(getChatLayout());
  });
};

export const appHasLoaded = () => {
  NativeModules.NativeRouting.appHasLoaded();
};

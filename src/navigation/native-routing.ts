import { NativeEventEmitter, NativeModules, AsyncStorage, Platform } from 'react-native';

import { SEEN_MARKETING_CAROUSEL_KEY } from 'src/constants';
import { chatScreen } from './screens/chat';

import { Navigation } from 'react-native-navigation';

export const setupNativeRouting = () => {
  const nativeRoutingEvents = new NativeEventEmitter(
    NativeModules.NativeRouting,
  );

  nativeRoutingEvents.addListener('NativeRoutingMarketingResult', (event) => {
    AsyncStorage.setItem(SEEN_MARKETING_CAROUSEL_KEY, 'true');
    if (Platform.OS === 'ios') {
      Navigation.push(event.componentId, chatScreen(event.marketingResult));
    } else if (Platform.OS === 'android') {
      Navigation.setStackRoot(event.componentId, chatScreen(event.marketingResult))
    }
  });
};

export const appHasLoaded = () => {
  NativeModules.NativeRouting.appHasLoaded();
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

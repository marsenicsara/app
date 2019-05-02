import { Navigation } from 'react-native-navigation';
import { YellowBox, UIManager, Platform } from 'react-native';

import { HOC } from './App';
import { setInitialLayout } from './src/navigation/layouts/initialLayout';
import {
  setupNativeRouting,
  appHasLoaded,
} from './src/navigation/native-routing';
import { getNavigationConstants } from './src/navigation/constants';
import { register } from './src/navigation/register';
import { patchCustomConfig } from './src/features/debug/patch-custom-config';

import { setupPushNotifications } from './src/setupPushNotifications';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

patchCustomConfig();

YellowBox.ignoreWarnings([
  'constantsToExport',
  'RNDocumentPicker',
  '<InputAccessory',
  'Overriding',
]);

const registerHandler = (name, componentCreator) => {
  if (Platform.OS === 'ios') {
    return Navigation.registerComponent(name, () => {
      const innerComponent = componentCreator();
      return HOC(innerComponent.options)(innerComponent);
    });
  }
};

getNavigationConstants().then(() => {
  register(registerHandler);
});

Navigation.events().registerAppLaunchedListener(async () => {
  await setInitialLayout();
  appHasLoaded();
  setupPushNotifications();
  setupNativeRouting();
});

import { Navigation } from 'react-native-navigation';
import { YellowBox, UIManager } from 'react-native';

import { HOC } from './App';
import { setInitialLayout } from './src/navigation/layouts/initialLayout';
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

const registerHandler = (name, componentCreator) =>
  Navigation.registerComponent(name, () => {
    const innerComponent = componentCreator();
    return HOC(innerComponent.options)(innerComponent);
  });

register(registerHandler);

Navigation.events().registerAppLaunchedListener(async () => {
  await setInitialLayout();
  setupPushNotifications();
});

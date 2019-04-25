import { AppRegistry } from 'react-native';
import Chat from './src/features/chat/Chat';
import { NewOffer } from './src/features/new-offer';
import { HOC } from './AndroidTestApp';
import OfferChat from './src/features/chat/OfferChat';
import { setupAndroidNativeRouting } from './src/navigation/native-routing';

const WrappedChat = HOC(Chat);

setupAndroidNativeRouting();

AppRegistry.registerComponent('Chat', () => WrappedChat);

const WrappedOffer = HOC(NewOffer);

AppRegistry.registerComponent('Offer', () => WrappedOffer);

const WrappedOfferChat = HOC(OfferChat);

AppRegistry.registerComponent('OfferChat', () => WrappedOfferChat);

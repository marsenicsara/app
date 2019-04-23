import { AppRegistry, View, Text } from 'react-native';
import Chat from './src/features/chat/Chat';
import { NewOffer } from './src/features/new-offer';
import { HOC } from './AndroidTestApp';

const WrappedChat = HOC(Chat);

AppRegistry.registerComponent('Chat', () => WrappedChat);

const WrappedOffer = HOC(NewOffer);

AppRegistry.registerComponent('Offer', () => WrappedOffer);

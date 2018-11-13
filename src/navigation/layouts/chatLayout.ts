import { CHAT_SCREEN } from '../screens/chat';

export const getChatLayout = () => ({
  root: {
    stack: {
      children: [CHAT_SCREEN],
    },
  },
});

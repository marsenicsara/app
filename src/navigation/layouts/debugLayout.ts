import { DEBUG_SCREEN } from 'src/navigation/screens/debug';

export const getDebugLayout = () => ({
  root: {
    stack: {
      children: [DEBUG_SCREEN],
    },
  },
});

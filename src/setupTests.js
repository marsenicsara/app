import 'jsdom-global/register';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-native-analytics-segment-io', () => ({
  track: () => {},
}));

jest.mock('react-native-branch', () => ({
  BranchEvent: {},
}));

jest.mock('@hedviginsurance/react-native-config', () => ({}));

jest.mock('react-native', () => require('react-native-mock-render'), {
  virtual: true,
});

jest.mock('@hedviginsurance/react-native-config', () => ({}));
jest.mock('react-native-firebase', () => ({
  messaging: () => {},
  getToken: () => {},
}));
jest.mock('react-native-fs', () => ({}));
jest.mock('react-native-document-picker', () => ({}));
jest.mock('react-native-analytics-segment-io', () => ({
  setup: () => {},
  track: () => {},
}));

jest.mock('react-native-gesture-handler', () => ({
  RectButton: require('react-native-mock-render').TouchableWithoutFeedback,
}));

jest.mock('react-native-navigation', () => ({
  Navigation: {
    events: () => ({
      registerComponentDidAppearListener: () => ({}),
      bindComponent: jest.fn(),
    }),
    mergeOptions: jest.fn(),
  },
}));
jest.mock('react-native-branch', () => ({
  subscribe: () => {},
  BranchEvent: {},
}));
jest.mock('@hedviginsurance/react-native-floating-action', () => ({}));
jest.mock(
  '@hedviginsurance/react-native-keyboard-spacer',
  () => require('react-native-mock-render').View,
);

jest.mock('react-native-audio', () => ({
  AudioRecorder: {},
  AudioUtils: {},
}));
jest.mock('react-native-sound', () => ({}));

jest.mock('redux', () => ({
  combineReducers: () => {},
  applyMiddleware: () => {},
  compose: () => {},
  createStore: () => ({
    getState: () => ({
      analytics: {},
      user: {},
    }),
    dispatch: jest.fn(),
  }),
}));

jest.mock('react-redux', () => ({
  connect: () => () => {},
}));

jest.mock('redux-saga', () => ({
  __esModule: true,
  default: () => ({
    run: jest.fn(),
  }),
}));

jest.mock('redux-persist', () => ({
  persistStore: () => ({}),
  persistReducer: () => ({}),
}));

global.fetch = jest.fn(() => {});

jest.useFakeTimers();

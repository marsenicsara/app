import * as React from 'react';
import { shallow } from 'enzyme';

import { PureOfferChat } from './OfferChat';

const dummyProps = {
  onboardingDone: false,
  intent: '',
  messages: [],
  getAvatars: () => {},
  getMessages: (intent: string) => {},
  onRequestClose: () => {},
};

it('Should render without crashing', () => {
  expect(() => () => shallow(<PureOfferChat {...dummyProps} />)).not.toThrow();
});

import * as React from 'react';
import { shallow, mount } from 'enzyme';

import { PureChat } from './Chat';

const dummyProps = {
  onboardingDone: false,
  isModal: false,
  showReturnToOfferButton: false,
  componentId: '',
  intent: '',
  messages: [],
  insurance: '',
  getAvatars: () => {},
  getMessages: (intent: string) => {},
  resetConversation: () => {},
};

it('Should render without crashing', () => {
  expect(() => () => shallow(<PureChat {...dummyProps} />)).not.toThrow();
});

it('Should call getAvatars and getMessages on mount', () => {
  const mockGetAvatars = jest.fn();
  const mockGetMessages = jest.fn();
  const wrapper = mount(
    <PureChat
      {...dummyProps}
      getAvatars={mockGetAvatars}
      getMessages={mockGetMessages}
    />,
  );
  expect(mockGetAvatars).toHaveBeenCalled();
  expect(mockGetMessages).toHaveBeenCalled();
});

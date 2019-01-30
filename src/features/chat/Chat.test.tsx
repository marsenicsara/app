import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Chat from './Chat';

const dummyProps = {
  isModal: false,
  componentId: '',
};

it('Should render without crashing', () => {
  expect(() => () => shallow(<Chat {...dummyProps} />)).not.toThrow();
});

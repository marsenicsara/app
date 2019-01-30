import * as React from 'react';
import { shallow } from 'enzyme';

import OfferChat from './OfferChat';

const dummyProps = {
  onRequestClose: () => {},
};

it('Should render without crashing', () => {
  expect(() => () => shallow(<OfferChat {...dummyProps} />)).not.toThrow();
});

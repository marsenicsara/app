import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { PerilsCategory } from './PerilsCategory';

describe('<PerilsCategory />', () => {
  it('Should render correctly', () => {
    const peril = {
      id: 'ME.LEGAL',
      title: 'Juridisk tvist',
    };
    const perils = [peril];
    const component = shallow(
      <PerilsCategory
        title={'Jag och min familj'}
        description={'Försäkras för'}
        perils={perils}
        iconUrl={''}
        key={0}
        navigation={null}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});

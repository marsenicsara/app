import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Peril } from './Peril';

describe('<Peril />', () => {
  it('Should render correctly', () => {
    const peril = {
      id: 'ME.LEGAL',
      title: 'Juridisk tvist',
    };
    const categoryPerils = [peril];
    const categoryTitle = 'Jag och min familj';
    const component = shallow(
      <Peril
        categoryPerils={categoryPerils}
        perilIndex={0}
        categoryTitle={categoryTitle}
        peril={peril}
      />,
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});

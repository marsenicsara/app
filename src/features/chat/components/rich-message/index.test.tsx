import * as React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import { RichMessage } from './';

test('renders giphy messages correctly', () => {
  const component = mount(
    <RichMessage
      fromUser
      withMargin={false}
      message={{
        body: { text: 'https://giphy.com/mock.gif' },
        header: {
          editAllowed: false,
          statusMessage: 'mock',
        },
      }}
      index={0}
    />,
  );

  expect(toJson(component)).toMatchSnapshot();
});

test('renders image messages correctly', () => {
  const component = mount(
    <RichMessage
      fromUser
      withMargin={false}
      message={{
        body: { text: 'https://randomwebsite.com/image.jpg' },
        header: {
          editAllowed: false,
          statusMessage: 'mock',
        },
      }}
      index={0}
    />,
  );

  expect(toJson(component)).toMatchSnapshot();
});

test('renders text messages correctly', () => {
  const component = mount(
    <RichMessage
      fromUser
      withMargin={false}
      message={{
        body: { text: 'mock message hello 123' },
        header: {
          editAllowed: false,
          statusMessage: 'mock',
        },
      }}
      index={0}
    />,
  );

  expect(toJson(component)).toMatchSnapshot();
});

test('renders text messages with hyperlinks correctly', () => {
  const component = mount(
    <RichMessage
      fromUser
      withMargin={false}
      message={{
        body: { text: 'mock message hello 123 https://www.hedvig.com' },
        header: {
          editAllowed: false,
          statusMessage: 'mock',
        },
      }}
      index={0}
    />,
  );

  expect(toJson(component)).toMatchSnapshot();
});

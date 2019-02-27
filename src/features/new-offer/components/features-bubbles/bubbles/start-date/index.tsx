import * as React from 'react';
import { colors } from '@hedviginsurance/brand';

import { Bubble } from '../../bubble';
import { BubbleAnimation } from '../../bubble-animation';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';

import { Title } from '../common/title';

import { Switcher } from './switcher';
import { New } from './new';

import { ChangeButton, ChangeButtonText } from './change-button';
import { Navigation } from 'react-native-navigation';
import { CHANGE_START_DATE_COMPONENT } from 'src/navigation/components/change-start-date';

interface StartDateProps {
  insuredAtOtherCompany: boolean;
}

export const StartDate: React.SFC<StartDateProps> = ({
  insuredAtOtherCompany,
}) => (
  <BubbleAnimation delay={0}>
    <Bubble width={150} height={150} backgroundColor={colors.PURPLE}>
      <TranslationsConsumer textKey="OFFER_BUBBLES_START_DATE_TITLE">
        {(text) => <Title>{text}</Title>}
      </TranslationsConsumer>
      <Spacing height={2.5} />
      {insuredAtOtherCompany ? <Switcher /> : <New />}
      <Spacing height={10} />
      <ChangeButton
        onPress={() => {
          Navigation.showOverlay({
            component: {
              name: CHANGE_START_DATE_COMPONENT.name,
              options: {
                layout: {
                  backgroundColor: 'transparent',
                },
              },
            },
          });
        }}
      >
        <ChangeButtonText>Ändra</ChangeButtonText>
      </ChangeButton>
    </Bubble>
  </BubbleAnimation>
);

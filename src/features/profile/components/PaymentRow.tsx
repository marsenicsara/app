import * as React from 'react';
import { Navigation } from 'react-native-navigation';

import { PAYMENT_SCREEN } from 'src/navigation/screens/payment';
import {
  TouchableProfileRow,
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileBankAccountIcon } from 'src/components/Icon';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';

interface PaymentRowProps {
  monthlyCost: number;
}

const PaymentRow: React.SFC<PaymentRowProps> = ({ monthlyCost }) => (
  <TouchableProfileRow
    onPress={() =>
      Navigation.showModal({
        stack: {
          children: [PAYMENT_SCREEN],
        },
      })
    }
  >
    <ProfileBankAccountIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>
        <TranslationsConsumer textKey="PROFILE_PAYMENT_ROW_HEADER">
          {(text) => text}
        </TranslationsConsumer>
      </ProfileRowHeader>
      <ProfileRowText>
        <TranslationsPlaceholderConsumer
          textKey="PROFILE_PAYMENT_ROW_TEXT"
          replacements={{ price: monthlyCost }}
        >
          {(text) => text}
        </TranslationsPlaceholderConsumer>
      </ProfileRowText>
    </ProfileRowTextContainer>
  </TouchableProfileRow>
);

export { PaymentRow };

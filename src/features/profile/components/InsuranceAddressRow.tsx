import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileFamilyIcon } from 'src/components/Icon';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface InsuranceAddressRowProps {
  address: string;
}

const InsuranceAddressRow: React.SFC<InsuranceAddressRowProps> = ({
  address,
}) => (
  <ProfileRow>
    <ProfileFamilyIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>
        <TranslationsConsumer textKey="PROFILE_INSURANCE_ADDRESS_ROW">
          {(text) => text}
        </TranslationsConsumer>
      </ProfileRowHeader>
      <ProfileRowText>{address}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { InsuranceAddressRow };

import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from 'src/features/profile/components/ProfileRow';
import { ProfileHeartIcon } from 'src/components/Icon';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface CashbackRowProps {
  name: string;
}

const CashbackRow: React.SFC<CashbackRowProps> = ({ name }) => (
  <ProfileRow>
    <ProfileHeartIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>
        <TranslationsConsumer textKey="PROFILE_CACHBACK_ROW">
          {(text) => text}
        </TranslationsConsumer>
      </ProfileRowHeader>
      <ProfileRowText>{name}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { CashbackRow };

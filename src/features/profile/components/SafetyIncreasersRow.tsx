import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileLockIcon } from 'src/components/Icon';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface SafetyIncreasersRowProps {
  safetyIncreasers: Array<string>;
}

const SafetyIncreasersRow: React.SFC<SafetyIncreasersRowProps> = ({
  safetyIncreasers,
}) => (
  <ProfileRow>
    <ProfileLockIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>
        <TranslationsConsumer textKey="PROFILE_SAFETYINCREASERS_ROW_HEADER">
          {(text) => text}
        </TranslationsConsumer>
      </ProfileRowHeader>
      <ProfileRowText>{safetyIncreasers.join(', ')}</ProfileRowText>
    </ProfileRowTextContainer>
  </ProfileRow>
);

export { SafetyIncreasersRow };

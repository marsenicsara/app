import * as React from 'react';
import {
  ProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileLockIcon } from 'src/components/Icon';

interface SafetyIncreasersRowProps {
  safetyIncreasers: Array<string>;
}

const SafetyIncreasersRow: React.SFC<SafetyIncreasersRowProps> = ({
  safetyIncreasers,
}) => {
  if (safetyIncreasers.length) {
    return (
      <ProfileRow>
        <ProfileLockIcon />
        <ProfileRowTextContainer>
          <ProfileRowHeader>Mina trygghetshöjare</ProfileRowHeader>
          <ProfileRowText>{safetyIncreasers.join(', ')}</ProfileRowText>
        </ProfileRowTextContainer>
      </ProfileRow>
    );
  }

  return null;
};

export { SafetyIncreasersRow };

import * as React from 'react';
import { Linking } from 'react-native';

import {
  TouchableProfileRow,
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
} from './ProfileRow';
import { ProfileCertificateIcon } from 'src/components/Icon';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface InsuranceCertificateRowProps {
  certificateUrl?: string;
}

const InsuranceCertificateRow: React.SFC<InsuranceCertificateRowProps> = ({
  certificateUrl,
}) =>
  certificateUrl ? (
    <TouchableProfileRow onPress={() => Linking.openURL(certificateUrl)}>
      <ProfileCertificateIcon />
      <ProfileRowTextContainer>
        <ProfileRowHeader>
          <TranslationsConsumer textKey="PROFILE_INSURANCE_CERTIFICATE_ROW_HEADER">
            {(text) => text}
          </TranslationsConsumer>
        </ProfileRowHeader>
        <ProfileRowText>
          <TranslationsConsumer textKey="PROFILE_INSURANCE_CERTIFICATE_ROW_TEXT">
            {(text) => text}
          </TranslationsConsumer>
        </ProfileRowText>
      </ProfileRowTextContainer>
    </TouchableProfileRow>
  ) : null;

export { InsuranceCertificateRow };

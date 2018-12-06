import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';
import { isApartmentOwner } from 'src/utils';
import { INSURANCE_TYPES } from 'src/constants';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface OwnerFootnoteProps {
  type: INSURANCE_TYPES;
}

const OwnerFootnote: React.SFC<OwnerFootnoteProps> = ({ type }) =>
  isApartmentOwner(type) ? (
    <>
      <Spacing height={16} />
      <Footnote>
        <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
        <FootnoteText>
          <TranslationsConsumer textKey="DASHBOARD_OWNER_FOOTNOTE">
            {(text) => text}
          </TranslationsConsumer>
        </FootnoteText>
      </Footnote>
    </>
  ) : null;

export { OwnerFootnote };

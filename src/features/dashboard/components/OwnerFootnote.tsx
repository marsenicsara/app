import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';
import { isApartmentOwner } from 'src/utils';
import { INSURANCE_TYPES } from 'src/constants';
import { Spacing } from 'src/components/Spacing';

interface OwnerFootnoteProps {
  type: INSURANCE_TYPES;
}

const OwnerFootnote: React.SFC<OwnerFootnoteProps> = ({ type }) =>
  isApartmentOwner({ insuranceType: type }) ? (
    <>
      <Spacing height={16} />
      <Footnote>
        <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
        <FootnoteText>Lägenheten försäkras till sitt fulla värde</FootnoteText>
      </Footnote>
    </>
  ) : null;

export { OwnerFootnote };

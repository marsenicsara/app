import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';
import { isStudentInsurance } from 'src/utils';
import { INSURANCE_TYPES } from 'src/constants';

interface InsuranceAmountFootnoteProps {
  type: INSURANCE_TYPES;
}

const InsuranceAmountFootnote: React.SFC<InsuranceAmountFootnoteProps> = ({
  type,
}) => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/pris.png')} />
    <FootnoteText>
      Prylarna försäkras totalt till{' '}
      {isStudentInsurance(type) ? '200 000' : '1 000 000'} kr
    </FootnoteText>
  </Footnote>
);

export { InsuranceAmountFootnote };

import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';
import { isStudentInsurance } from 'src/utils';
import { INSURANCE_TYPES } from 'src/constants';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';

interface InsuranceAmountFootnoteProps {
  type: INSURANCE_TYPES;
}

const InsuranceAmountFootnote: React.SFC<InsuranceAmountFootnoteProps> = ({
  type,
}) => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
    <FootnoteText>
      <TranslationsPlaceholderConsumer
        textKey="DASHBOARD_INSURANCE_AMOUNT_FOOTNOTE"
        replacements={{
          student: isStudentInsurance(type) ? '200 000' : '1 000 000',
        }}
      >
        {(text) => text}
      </TranslationsPlaceholderConsumer>
    </FootnoteText>
  </Footnote>
);

export { InsuranceAmountFootnote };

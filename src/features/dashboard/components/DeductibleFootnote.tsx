import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const DeductibleFootnote: React.SFC = () => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
    <FootnoteText>
      <TranslationsConsumer textKey={'DASHBOARD_DEDUCTIBLE_FOOTNOTE'}>
        {(text) => text}
      </TranslationsConsumer>
    </FootnoteText>
  </Footnote>
);

export { DeductibleFootnote };

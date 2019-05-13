import * as React from 'react';
import {
  Footnote,
  FootnoteIcon,
  FootnoteText,
} from 'src/features/dashboard/components/Footnote';

const DeductibleFootnote: React.SFC = () => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
    <FootnoteText>Din självrisk är 1 500 kr</FootnoteText>
  </Footnote>
);

export { DeductibleFootnote };

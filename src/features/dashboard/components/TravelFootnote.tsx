import * as React from 'react';
import { Footnote, FootnoteIcon, FootnoteText } from './Footnote';

const TravelFootnote: React.SFC = () => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
    <FootnoteText>Gäller på resor varsomhelst i världen</FootnoteText>
  </Footnote>
);

export { TravelFootnote };

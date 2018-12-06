import * as React from 'react';
import { Footnote, FootnoteIcon, FootnoteText } from './Footnote';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const TravelFootnote: React.SFC = () => (
  <Footnote>
    <FootnoteIcon source={require('assets/icons/my_insurance/aktiv.png')} />
    <FootnoteText>
      <TranslationsConsumer textKey="DASHBOARD_TRAVEL_FOOTNOTE">
        {(text) => text}
      </TranslationsConsumer>
    </FootnoteText>
  </Footnote>
);

export { TravelFootnote };

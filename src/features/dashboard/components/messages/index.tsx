import * as React from 'react';
import { Navigation } from 'react-native-navigation';

import { Message, MessageType } from './Message';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';
import { PAYMENT_SCREEN } from 'src/navigation/screens/payment';

import { MessagesComponent, DirectDebitStatus } from 'src/graphql/components';

export const Messages: React.SFC = () => (
  <MessagesComponent>
    {({ data, loading, error }) =>
      loading || error || data === undefined ? null : (
        <>
          <Message
            visible={data.directDebitStatus === DirectDebitStatus.NEEDS_SETUP}
            message={
              <TranslationsConsumer textKey="TRUSTLY_PAYMENT_SETUP_MESSAGE">
                {(t) => t}
              </TranslationsConsumer>
            }
            messageType={MessageType.NOTIFY}
            action={
              <TranslationsConsumer textKey="TRUSTLY_PAYMENT_SETUP_ACTION">
                {(t) => t}
              </TranslationsConsumer>
            }
            onPressAction={() =>
              Navigation.showModal({
                stack: {
                  children: [PAYMENT_SCREEN],
                },
              })
            }
          />
        </>
      )
    }
  </MessagesComponent>
);

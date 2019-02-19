import * as React from 'react';
import { Navigation } from 'react-native-navigation';

import { Message, MessageType } from './Message';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { PAYMENT_SCREEN } from 'src/navigation/screens/payment';

import {
  MessagesComponent,
  RegisterAccountProcessingStatus,
} from 'src/graphql/components';

export const Messages: React.SFC = () => (
  <MessagesComponent>
    {({ data, loading, error }) =>
      loading || error || data === undefined ? null : (
        <>
          <Message
            visible={
              data.registerAccountProcessingStatus ===
              RegisterAccountProcessingStatus.NOT_INITIATED
            }
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

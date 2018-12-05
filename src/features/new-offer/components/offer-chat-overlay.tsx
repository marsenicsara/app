import * as React from 'react';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Header } from 'src/components/draggable-overlay/header';
import OfferChat from 'src/features/chat/OfferChat';
import { Navigation } from 'react-native-navigation';
import { BackButton } from 'src/components/BackButton';

export const OfferChatOverlay: React.SFC<{ componentId: string }> = ({
  componentId,
}) => (
  <DraggableOverlay
    heightPercentage={90}
    onClose={() => Navigation.dismissOverlay(componentId)}
  >
    {(handleClose) => (
      <>
        <BackButton onPress={() => handleClose()} />
        <TranslationsConsumer textKey="OFFER_CHAT_HEADER">
          {(text) => (
            <Header
              title={text}
              onCloseClick={handleClose}
              restartButton={true}
            />
          )}
        </TranslationsConsumer>
        <OfferChat onRequestClose={handleClose} />
      </>
    )}
  </DraggableOverlay>
);

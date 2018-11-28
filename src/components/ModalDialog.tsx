import React from 'react';
import { Dimensions, Text, StyleSheet, Modal, View } from 'react-native';
import { theme } from '../style-theme';
import {
  DialogContainer,
  Heading,
  Paragraph,
  ButtonsContainer,
} from './styles/dialog';
import { DialogButton } from './Button';
import { colors } from '@hedviginsurance/brand';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  title: React.ReactNode;
  paragraph: React.ReactNode;
  confirmButtonTitle: string;
  dismissButtonTitle: string;
  onConfirm?: () => void;
  onDismiss?: () => void;
}

export const ModalDialog: React.SFC<Props> = ({
  title,
  paragraph,
  confirmButtonTitle,
  dismissButtonTitle,
  onConfirm,
  onDismiss,
}) => (
  <>
    <Modal transparent animationType="fade">
      <View style={styles.dialogStyle}>
        <View
          style={{
            width: Dimensions.get('window').width - 2 * theme.mobile.margin.big,
          }}
        >
          {title ? (
            <DialogContainer>
              <Heading>{title}</Heading>
              <Paragraph>{paragraph}</Paragraph>
              <ButtonsContainer style={{ backgroundColor: colors.BLACK }}>
                <TranslationsConsumer textKey="RESTART_OFFER_CHAT_BUTTON_DISMISS">
                  {(text) => (
                    <DialogButton
                      title={text}
                      onPress={onDismiss}
                      borderRight={confirmButtonTitle ? true : false}
                    />
                  )}
                </TranslationsConsumer>
                <TranslationsConsumer textKey="RESTART_OFFER_CHAT_BUTTON_CONFIRM">
                  {(text) => <DialogButton title={text} onPress={onConfirm} />}
                </TranslationsConsumer>
              </ButtonsContainer>
            </DialogContainer>
          ) : (
            <Text />
          )}
        </View>
      </View>
    </Modal>
  </>
);

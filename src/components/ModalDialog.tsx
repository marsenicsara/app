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
import { TranslationsConsumer } from 'src/components/translations/consumer';
import styled from '@sampettersson/primitives';

const ModalView = styled(View)({
  backgroundColor: 'rgba(0,0,0,0.5)',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Wrapper = styled(View)({
  width: Dimensions.get('window').width - 2 * theme.mobile.margin.big,
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
      <ModalView>
        <Wrapper>
          {title ? (
            <DialogContainer>
              <Heading>{title}</Heading>
              <Paragraph>{paragraph}</Paragraph>
              <ButtonsContainer>
                <TranslationsConsumer textKey={dismissButtonTitle}>
                  {(text) => (
                    <DialogButton
                      title={text}
                      onPress={onDismiss}
                      borderRight={confirmButtonTitle ? true : false}
                    />
                  )}
                </TranslationsConsumer>
                <TranslationsConsumer textKey={confirmButtonTitle}>
                  {(text) => <DialogButton title={text} onPress={onConfirm} />}
                </TranslationsConsumer>
              </ButtonsContainer>
            </DialogContainer>
          ) : (
            <Text />
          )}
        </Wrapper>
      </ModalView>
    </Modal>
  </>
);

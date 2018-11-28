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
  confirmButtonTitle: React.ReactNode;
  dismissButtonTitle: React.ReactNode;
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
                <DialogButton
                  title={dismissButtonTitle}
                  onPress={onDismiss}
                  borderRight={confirmButtonTitle ? true : false}
                />
                <DialogButton title={confirmButtonTitle} onPress={onConfirm} />
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

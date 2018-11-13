import * as React from 'react';
import { Text, View } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';

import { CircledExclamationMark } from 'src/components/icons/CircledExclamationMark';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { DialogButton } from 'src/components/Button';
import { Spacing } from 'src/components/Spacing';
import { NavigationEvents } from 'src/navigation/events';

import { Navigation } from 'react-native-navigation';
import { CASHBACK_PICKER_COMPONENT } from 'src/navigation/components/cashback-picker';

const MessageText = styled(Text)({
  color: colors.BLACK,
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  maxWidth: 280,
  textAlign: 'center',
});

const MessageContainer = styled(View)({
  maxHeight: 50,
});

const ButtonContainer = styled(View)({
  maxHeight: 40,
});


export const SelectCashback = () => (
  <>
    <CircledExclamationMark width={30} height={30} />
    <Spacing height={20} />
    <MessageContainer>
      <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_MESSAGE">
        {(text) => <MessageText>{text}</MessageText>}
      </TranslationsConsumer>
      <ButtonContainer>
        <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_ACTION">
          {(text) => (
            <NavigationEvents>
              {(triggerEvent: (event: { name: string }) => void) => (
                <DialogButton
                  title={text}
                  onPress={() => {
                    triggerEvent({ name: 'showModal' })
                    Navigation.showOverlay({
                      component: {
                        name: CASHBACK_PICKER_COMPONENT.name,
                        options: {
                          layout: {
                            backgroundColor: 'transparent',
                          },
                        }
                      }
                    })
                  }}
                />
              )}
            </NavigationEvents>
          )}
        </TranslationsConsumer>
      </ButtonContainer>
    </MessageContainer>
    <Spacing height={20} />
  </>
);

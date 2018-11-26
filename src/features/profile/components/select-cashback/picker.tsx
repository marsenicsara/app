import * as React from 'react';
import { DraggableOverlay } from 'src/components/draggable-overlay';
import { Text, View, Dimensions, Platform } from 'react-native';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import { isIphoneX } from 'react-native-iphone-x-helper';

import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Spacing } from 'src/components/Spacing';
import {
  CashbackOptionsComponent,
  SelectCashbackOptionComponent,
  Query,
} from 'src/graphql/components';
import { Loader } from 'src/components/Loader';
import { PillButton } from 'src/components/PillButton';
import { Navigation } from 'react-native-navigation';
import { BackButton } from 'src/components/BackButton';
import { NavigationEvents } from 'src/navigation/events';

interface PickerProps {
  componentId: string
}

const Header = styled(View)({
  padding: 30,
  backgroundColor: colors.LIGHT_GRAY,
});

const HeaderText = styled(Text)({
  fontSize: 20,
  textAlign: 'center',
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontWeight: '700',
});

const DescriptionText = styled(Text)({
  fontSize: 16,
  textAlign: 'center',
  fontFamily: fonts.CIRCULAR,
  color: colors.DARK_GRAY,
  maxWidth: 280,
  alignSelf: 'center',
});

const Actions = styled(View)({
  flexDirection: 'row',
  width: '100%',
  paddingLeft: 20,
  paddingRight: 20,
});

const ActionContainer = styled(View)({
  paddingLeft: 10,
  paddingRight: 10,
  flex: 1,
  height: 40,
});

const VIEW_HEIGHT = isIphoneX() ? 255 : 235

export const Picker: React.SFC<PickerProps> = ({ componentId }) => (
  <NavigationEvents>
    {(triggerEvent: (event: { name: string }) => void) => (
      <DraggableOverlay
        heightPercentage={(VIEW_HEIGHT * 100) / Dimensions.get('window').height}
        onClose={() => {
          triggerEvent({ name: 'dismissModal' })
          Navigation.dismissOverlay(componentId)
        }}
      >
        {(handleClose) => (
          <>
            <BackButton onPress={() => handleClose()} />
            <Header>
              <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_OVERLAY_TITLE">
                {(text) => <HeaderText>{text}</HeaderText>}
              </TranslationsConsumer>
            </Header>
            <Spacing height={20} />
            <TranslationsConsumer textKey="CASHBACK_NEEDS_SETUP_OVERLAY_PARAGRAPH">
              {(text) => <DescriptionText>{text}</DescriptionText>}
            </TranslationsConsumer>
            <Spacing height={20} />
            <CashbackOptionsComponent>
              {({ loading, data, error }) => {
                if (loading) {
                  return <Loader />;
                }

                if (error) {
                  throw error;
                }

                if (!data) {
                  return null;
                }

                return (
                  <Actions>
                    {data.cashbackOptions.map((option) => (
                      <ActionContainer key={option.id!}>
                        <SelectCashbackOptionComponent
                          variables={{ id: option.id! }}
                          update={(cache, { data }) => {
                            if (!data) return;
                            cache.writeData<Partial<Query>>({
                              data: {
                                cashback: data.selectCashbackOption,
                              },
                            });
                          }}
                        >
                          {(selectCashback, { loading }) => (
                            <PillButton
                              text={option.name!}
                              loading={loading}
                              onPress={async () => {
                                await selectCashback();
                                handleClose();
                              }}
                            />
                          )}
                        </SelectCashbackOptionComponent>
                      </ActionContainer>
                    ))}
                  </Actions>
                );
              }}
            </CashbackOptionsComponent>
          </>
        )}
      </DraggableOverlay>
    )}
  </NavigationEvents>
);

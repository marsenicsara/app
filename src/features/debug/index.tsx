import * as React from 'react';
import { ScrollView, Text, Alert } from 'react-native';
import { AsyncStorage } from 'react-native';
import styled from '@sampettersson/primitives';
import { fonts } from '@hedviginsurance/brand';

import { getMarketingLayout } from 'src/navigation/layouts/marketingLayout';
import { getChatLayout } from 'src/navigation/layouts/chatLayout';
import { getNewOfferLayout } from 'src/navigation/layouts/newOfferLayout';
import { getMainLayout } from 'src/navigation/layouts/mainLayout';
import { setLayout } from 'src/navigation/layouts/setLayout';

import { addMockData } from 'src/navigation/mock/new-offering-screens';
import { PersistentDebug } from './persistent-debug';
import { Config } from './config';
import { Row } from './row';

const openMarketingLayout = async () => setLayout(await getMarketingLayout());

const openChatLayout = async () => setLayout(await getChatLayout());

const openNewOfferLayout = async () => setLayout(await getNewOfferLayout());

const openMockedNewOfferLayout = async () => {
  await addMockData();
  setLayout(await getNewOfferLayout());
};

const openDashboard = async () => {
  setLayout(await getMainLayout());
};

const resetStorage = async () =>
  AsyncStorage.clear()
    .then(() => {
      Alert.alert('Done!', 'Storage cleared.', [{ text: 'OK' }]);
    })
    .catch(() => {
      Alert.alert('Oh noes!', 'Storage could not be cleared.', [
        { text: 'OK' },
      ]);
    });

const Label = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  padding: 20,
  fontWeight: '700',
  fontSize: 17,
});

export const Debug = () => (
  <ScrollView>
    <Label>Actions</Label>
    <Row onPress={resetStorage}>Reset storage</Row>
    <Config />
    <Label>Screens</Label>
    <Row onPress={openMarketingLayout}>Open marketing screens</Row>
    <Row onPress={openChatLayout}>Open chat screens</Row>
    <Row onPress={openNewOfferLayout}>Open new offering screens</Row>
    <Row onPress={openMockedNewOfferLayout}>
      Open new offering screens (mocked)
    </Row>
    <Row onPress={openDashboard}>Open dashboard</Row>
    <Label>Options</Label>
    <PersistentDebug />
  </ScrollView>
);

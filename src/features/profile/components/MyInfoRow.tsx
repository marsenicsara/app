
import * as React from 'react';
import {
  ProfileRowTextContainer,
  ProfileRowHeader,
  ProfileRowText,
  TouchableProfileRow,
} from './ProfileRow';
import { ProfileFamilyIcon } from 'src/components/Icon';
import { Navigation } from 'react-native-navigation';

const MyInfoRow: React.SFC<{ componentId: string }> = ({ componentId }) => (
  <TouchableProfileRow onPress={() => {
    // @ts-ignore
    Navigation.push(componentId, { externalComponent: { name: 'myInfo' } })
  }}>
    <ProfileFamilyIcon />
    <ProfileRowTextContainer>
      <ProfileRowHeader>Min info</ProfileRowHeader>
      <ProfileRowText>Test Testerson</ProfileRowText>
    </ProfileRowTextContainer>
  </TouchableProfileRow>
);

export { MyInfoRow };

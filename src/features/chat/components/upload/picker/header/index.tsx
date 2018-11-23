import * as React from 'react';
import styled from '@sampettersson/primitives';
import { View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { Spacing } from 'src/components/Spacing';
import { Camera } from 'src/components/icons/Camera';

import { UploadMutation } from '../upload-mutation';
import { UploadingAnimation } from '../uploading-animation';
import { File } from './file';
import { PickerButton } from './picker-button';

const HeaderContainer = styled(View)({
  padding: 10,
  paddingRight: 0,
  flexDirection: 'column',
});

interface HeaderProps {
  onUpload: (url: string) => void;
}

export const Header: React.SFC<HeaderProps> = ({ onUpload }) => (
  <HeaderContainer>
    <UploadMutation>
      {(upload, isUploading) => (
        <PickerButton
          onPress={() => {
            ImagePicker.launchCamera({}, (response) => {
              if (response.uri) {
                upload(response.uri).then((uploadResponse) => {
                  if (uploadResponse instanceof Error) {
                  } else {
                    onUpload(uploadResponse.key);
                  }
                });
              }
            });
          }}
        >
          <UploadingAnimation darkMode isUploading={isUploading}>
            <Camera width={35} height={35} />
          </UploadingAnimation>
        </PickerButton>
      )}
    </UploadMutation>
    <Spacing height={10} />
    <File onUpload={onUpload} />
  </HeaderContainer>
);

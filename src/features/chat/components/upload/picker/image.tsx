import * as React from 'react';
import { TouchableWithoutFeedback, View, Image as RNImage } from 'react-native';
import styled from '@sampettersson/primitives';

import { UploadMutation } from './upload-mutation';
import { Presend } from './presend';

const Padding = styled(View)(({ isLastInList }: { isLastInList: boolean }) => ({
  padding: 10,
  paddingRight: 0,
  marginRight: isLastInList ? 10 : 0,
  height: 250,
  width: 250,
}));

const BorderRadius = styled(View)({
  borderRadius: 10,
  overflow: 'hidden',
});

const ImageContainer = styled(RNImage)({
  height: '100%',
  width: '100%',
});

interface ImageProps {
  uri: string;
  onUpload: (key: string) => void;
  isLastInList: boolean;
}

export const Image: React.SFC<ImageProps> = ({
  uri,
  onUpload,
  isLastInList,
}) => (
  <UploadMutation>
    {(uploadFile, isUploading) => (
      <Padding isLastInList={isLastInList}>
        <BorderRadius>
          <Presend
            isUploading={isUploading}
            onPressSend={() => {
              uploadFile(uri).then((response) => {
                if (response instanceof Error) {
                } else {
                  onUpload(response.key);
                }
              });
            }}
          >
            {(showPresendOverlay) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  showPresendOverlay();
                }}
              >
                <ImageContainer source={{ uri }} />
              </TouchableWithoutFeedback>
            )}
          </Presend>
        </BorderRadius>
      </Padding>
    )}
  </UploadMutation>
);

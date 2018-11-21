import * as React from 'react';
import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styled from '@sampettersson/primitives';
import { colors, fonts } from '@hedviginsurance/brand';
import {
  DocumentPicker,
  DocumentPickerUtil,
} from 'react-native-document-picker';

import { DraggableOverlay } from 'src/components/draggable-overlay';
import { ImageLibrary } from 'src/components/icons/ImageLibrary';
import { Spacing } from 'src/components/Spacing';

import { UploadMutation } from '../upload-mutation';
import { UploadingAnimation } from '../uploading-animation';

import { PickerButton } from './picker-button';
import { OpenState } from 'src/components/OpenState';
import { isIphoneX } from 'react-native-iphone-x-helper';

const OverlayContent = styled(View)({
  paddingLeft: 30,
  paddingRight: 30,
});

const Row = styled(View)({
  flexDirection: 'row',
});

const OpenPickerButton = styled(TouchableOpacity)({
  borderWidth: 1,
  borderColor: colors.PURPLE,
  height: 40,
  borderRadius: 20,
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const PickerButtonText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.PURPLE,
  fontSize: 14,
});

const Heading = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  color: colors.BLACK,
  fontSize: 15,
  fontWeight: '600',
});

interface FileProps {
  onUpload: (url: string) => void;
}

export const File: React.SFC<FileProps> = ({ onUpload }) => (
  <UploadMutation>
    {(upload, isUploading) => (
      <OpenState initialOpenState={false}>
        {({ isOpen, setIsOpen }) => (
          <>
            <PickerButton
              onPress={() => {
                setIsOpen(true);
              }}
            >
              <UploadingAnimation darkMode isUploading={isUploading}>
                <ImageLibrary width={18} height={18} />
              </UploadingAnimation>
            </PickerButton>
            {isOpen && (
              <DraggableOverlay
                heightPercentage={
                  ((isIphoneX() ? 125 : 100) /
                    Dimensions.get('window').height) *
                  100
                }
                onClose={() => setIsOpen(false)}
              >
                {(handleClose: (() => void)) => (
                  <OverlayContent>
                    <Spacing height={20} />
                    <Heading>Vad vill du skicka?</Heading>
                    <Spacing height={10} />
                    <Row>
                      <OpenPickerButton
                        onPress={() => {
                          ImagePicker.launchImageLibrary({}, (response) => {
                            if (response.origURL) {
                              handleClose();
                              upload(response.origURL).then(
                                (uploadResponse) => {
                                  if (uploadResponse instanceof Error) {
                                  } else {
                                    onUpload(uploadResponse.key);
                                  }
                                },
                              );
                            }
                          });
                        }}
                      >
                        <PickerButtonText>Bild eller film</PickerButtonText>
                      </OpenPickerButton>
                      <Spacing width={15} />
                      <OpenPickerButton
                        onPress={() => {
                          DocumentPicker.show(
                            {
                              filetype: [DocumentPickerUtil.allFiles()],
                            },
                            (_: any, res: any) => {
                              setTimeout(() => {
                                handleClose();
                                upload(res.uri).then((uploadResponse) => {
                                  if (uploadResponse instanceof Error) {
                                  } else {
                                    onUpload(uploadResponse.key);
                                  }
                                });
                              }, 50);
                            },
                          );
                        }}
                      >
                        <PickerButtonText>Fil</PickerButtonText>
                      </OpenPickerButton>
                    </Row>
                  </OverlayContent>
                )}
              </DraggableOverlay>
            )}
          </>
        )}
      </OpenState>
    )}
  </UploadMutation>
);

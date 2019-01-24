import * as React from 'react';
import { View, Text } from 'react-native';
import Permissions from 'react-native-permissions';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Sound from 'react-native-sound';
import styled from '@sampettersson/primitives';

import {
  RecordButton,
  StopRecordingButton,
  StopRecordingAnimationButton,
} from '../../../components/Button';
import { AnimatedSingleSelectOptionButton } from '../components/Button';
import { UploadingAnimation } from '../../../components/Animation';
import {
  StyledMarginContainer,
  StyledRightAlignedOptions,
} from '../styles/chat';
import { StyledPassiveText } from '../../../components/styles/text';
import { Spacing } from '../../../components/Spacing';

import { colors } from '@hedviginsurance/brand';

import { Container, ActionMap, EffectMap, EffectProps } from 'constate';
import { Mount } from 'react-lifecycle-components';
import { UploadMutation } from '../components/upload/picker/upload-mutation';
import { Message } from '../types';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SEND_AUDIO_MUTATION = gql`
  mutation SendChatAudioResponse($input: ChatResponseAudioInput!) {
    sendChatAudioResponse(input: $input)
  }
`;

const audioPath = `${AudioUtils.DocumentDirectoryPath}/claim.aac`;

const PreRecordingContainer = styled(View)({
  flexDirection: 'row',
});

const PreRecordingText = styled(Text)({
  fontFamily: 'CircularStd-Book',
  color: colors.OFF_BLACK,
  fontSize: 12,
  alignSelf: 'center',
  paddingRight: 12,
  paddingBottom: 8,
});

const PlaybackStatusText = styled(Text)({
  fontFamily: 'CircularStd-Book',
  color: colors.DARK_GRAY,
  fontSize: 14,
  marginRight: 16,
});

const RecordingTimeContainer = styled(View)({
  flexDirection: 'column',
  alignItems: 'flex-end',
  width: '50%',
});

interface State {
  isRecording: boolean;
  isPlayingBack: boolean;
  recordingTime: number;
  isFinished: boolean;
  recordingUrl: string;
  hasSentUpload: boolean;
  sound: any;
  playbackStatus?: string;
  playbackStatusUpdater: number | null;
  showPermissionDialog: boolean;
}

interface Actions {
  setRecordingTime: (recordingTime: number) => void;
  restartRecording: () => void;
  setHasSentUpload: (hasSentUpload: boolean) => void;
  setShowPermissionDialog: (showPermissionDialog: boolean) => void;
}

const actions: ActionMap<State, Actions> = {
  setRecordingTime: (recordingTime) => () => ({
    recordingTime: Math.floor(recordingTime),
  }),
  restartRecording: () => () => ({
    isFinished: false,
  }),
  setHasSentUpload: (hasSentUpload) => () => ({
    hasSentUpload,
  }),
  setShowPermissionDialog: (showPermissionDialog) => () => ({
    showPermissionDialog,
  }),
};

interface Effects {
  finishRecording: (success: any, url: string, audioFileSize: number) => void;
  startRecording: () => void;
  stopRecording: () => void;
  startPlayback: () => void;
  stopPlayback: () => void;
}

const effects: EffectMap<State, Effects> = {
  finishRecording: (success: any, url: string, audioFileSize: number) => ({
    setState,
    state,
  }: EffectProps<State>) => {
    if (!success) {
      return;
    }

    setState(() => ({
      recordingUrl: url,
    }));
  },
  startRecording: () => async ({ setState, state }: EffectProps<State>) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      // SHOW PERMISSION DIALOG
      setState(() => ({ showPermissionDialog: true }));
    }

    await setState(() => ({
      isRecording: true,
    }));
    await AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });

    AudioRecorder.startRecording();
  },
  stopRecording: () => async ({ setState, state }: EffectProps<State>) => {
    await AudioRecorder.stopRecording();
    setState(() => ({
      isRecording: false,
      isFinished: true,
    }));
  },
  startPlayback: () => async ({ setState, state }: EffectProps<State>) => {
    const sound = new Sound(audioPath, '', () => {
      setState({
        isPlayingBack: true,
        sound,
        playbackStatusUpdater: setInterval(() => {
          if (state.sound) {
            state.sound.getCurrentTime((seconds: number) => {
              setState(() => ({ playbackStatus: `${Math.floor(seconds)}s` }));
            });
          }
        }, 100),
      });

      sound.play(() => {
        if (state.sound) {
          state.sound.stop();
        }

        if (state.playbackStatusUpdater) {
          clearInterval(state.playbackStatusUpdater);
          setState(() => ({
            isPlayingBack: false,
            playbackStatus: undefined,
          }));
        }
      });
    });
  },
  stopPlayback: () => ({ setState, state }: EffectProps<State>) => {
    if (state.sound) {
      state.sound.stop();
    }

    if (state.playbackStatusUpdater) {
      clearInterval(state.playbackStatusUpdater);
      setState(() => ({
        isPlayingBack: false,
        playbackStatus: undefined,
      }));
    }
  },
};

const requestPermissions = async () => {
  const status = await Permissions.check('microphone');
  if (status !== 'authorized') {
    const requestStatus = await Permissions.request('microphone', {
      type: 'always',
    });
    return requestStatus === 'authorized';
  }
  return true;
};

interface AudioInputProps {
  message: Message;
}

const AudioInput: React.SFC<AudioInputProps> = ({ message }) => {
  return (
    <Container
      actions={actions}
      effects={effects}
      initialState={{
        isRecording: false,
        recordingTime: 0.0,
        isFinished: false,
        showPermissionDialog: false,
      }}
    >
      {({
        isRecording,
        isPlayingBack,
        hasSentUpload,
        recordingTime,
        recordingUrl,
        isFinished,
        setRecordingTime,
        finishRecording,
        startRecording,
        stopRecording,
        restartRecording,
        startPlayback,
        stopPlayback,
        playbackStatus,
        showPermissionDialog,
        setShowPermissionDialog,
      }) => (
        <UploadMutation>
          {(upload, isUploading) => (
            <>
              <Mount
                on={() => {
                  AudioRecorder.onProgress = (data: any) => {
                    setRecordingTime(data.currentTime);
                  };
                  AudioRecorder.onFinished = (data: any) => {
                    finishRecording(
                      data.status === 'OK',
                      data.audioFileURL,
                      data.audioFileSize,
                    );
                  };
                }}
              >
                {null}
              </Mount>
              <ConfirmationDialog
                title={'Inspelning'}
                paragraph={
                  'Vänligen aktivera ljudinspelning för Hedvig i dina systeminställningar.'
                }
                confirmButtonTitle={'Ja'}
                dismissButtonTitle={'Nej'}
                showModal={showPermissionDialog}
                updateModalVisibility={setShowPermissionDialog}
                onConfirm={() => {}}
              />
              {isPlayingBack ? (
                <StyledMarginContainer>
                  <StyledRightAlignedOptions>
                    <StopRecordingButton onPress={stopPlayback} />
                    <PlaybackStatusText>{playbackStatus}</PlaybackStatusText>
                  </StyledRightAlignedOptions>
                </StyledMarginContainer>
              ) : isUploading || hasSentUpload ? (
                <StyledMarginContainer>
                  <StyledRightAlignedOptions>
                    <UploadingAnimation />
                  </StyledRightAlignedOptions>
                </StyledMarginContainer>
              ) : isRecording ? (
                <StyledMarginContainer>
                  <StyledRightAlignedOptions>
                    <RecordingTimeContainer>
                      <StopRecordingAnimationButton onPress={stopRecording} />
                      <Spacing height={15} />
                      <StyledPassiveText>
                        Spelar in: {recordingTime}
                      </StyledPassiveText>
                    </RecordingTimeContainer>
                  </StyledRightAlignedOptions>
                </StyledMarginContainer>
              ) : isFinished ? (
                <StyledMarginContainer>
                  <StyledRightAlignedOptions>
                    <AnimatedSingleSelectOptionButton
                      title="Gör om"
                      onPress={restartRecording}
                    />
                  </StyledRightAlignedOptions>
                  <StyledRightAlignedOptions>
                    <AnimatedSingleSelectOptionButton
                      title="Spela upp"
                      onPress={startPlayback}
                    />
                  </StyledRightAlignedOptions>
                  <StyledRightAlignedOptions>
                    <Mutation mutation={SEND_AUDIO_MUTATION}>
                      {(mutate) => (
                        <AnimatedSingleSelectOptionButton
                          title="Spara"
                          onPress={() => {
                            upload(recordingUrl).then((uploadResponse: any) => {
                              if (uploadResponse instanceof Error) {
                                console.log('Error when uploading audio.');
                              } else {
                                mutate({
                                  variables: {
                                    input: {
                                      globalId: message.globalId,
                                      body: {
                                        url: recordingUrl,
                                      },
                                    },
                                  },
                                });
                              }
                            });
                          }}
                        />
                      )}
                    </Mutation>
                  </StyledRightAlignedOptions>
                </StyledMarginContainer>
              ) : (
                <StyledMarginContainer>
                  <StyledRightAlignedOptions>
                    <PreRecordingContainer>
                      <PreRecordingText>{message.body.text}</PreRecordingText>
                      <RecordButton onPress={startRecording} />
                    </PreRecordingContainer>
                  </StyledRightAlignedOptions>
                </StyledMarginContainer>
              )}
            </>
          )}
        </UploadMutation>
      )}
    </Container>
  );
};

export default AudioInput;

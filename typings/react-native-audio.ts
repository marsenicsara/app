declare module 'react-native-audio' {
  interface AudioRecorder {
    startRecording: () => void;
    stopRecording: () => void;
    prepareRecordingAtPath: (path: string, info: object) => void;
    onProgress?: (data: any) => void;
    onFinished?: (data: any) => void;
  }

  interface AudioUtils {
    DocumentDirectoryPath: string;
  }

  var AudioRecorder: AudioRecorder;
  var AudioUtils: AudioUtils;

  export { AudioRecorder, AudioUtils };
}

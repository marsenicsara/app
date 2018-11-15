declare module 'react-native-heic-converter' {
  interface ConvertResponse {
    path: string;
  }

  interface ReactNativeHeicConverter {
    convert: ({ path }: { path: string }) => Promise<ConvertResponse>;
  }

  var heicConverter: ReactNativeHeicConverter;

  export default heicConverter;
}

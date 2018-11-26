declare module '@hedviginsurance/react-native-document-picker' {
  type DocumentPickerFileOption = string;

  interface IDocumentPickerUtil {
    allFiles: () => DocumentPickerFileOption;
    images: () => DocumentPickerFileOption;
    plainText: () => DocumentPickerFileOption;
    audio: () => DocumentPickerFileOption;
    video: () => DocumentPickerFileOption;
    pdf: () => DocumentPickerFileOption;
  }

  export const DocumentPickerUtil: IDocumentPickerUtil;

  interface ShowOptions {
    filetype: DocumentPickerFileOption[];
  }

  interface Response {
    uri: string;
    type: string;
    fileName: string;
    fileSize: number;
  }

  type DocumentPickerCallback = (error: Error, res: Response) => void;

  interface IDocumentPicker {
    show: (options: ShowOptions, callback: DocumentPickerCallback) => void;
  }

  export const DocumentPicker: IDocumentPicker;
}

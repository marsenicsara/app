export interface Choice {
  text: string;
  value: string;
  type: string;
  view: string;
  webUrl: string;
  appUrl: string;
  id: string;
  selected: boolean;
}

export interface Message {
  header: {
    shouldRequestPushNotifications: boolean;
    avatarName: string;
    pollingInterval: number;
    loadingIndicator: string;
    statusMessage: string;
    editAllowed: boolean;
    richTextChatCompatible: boolean;
  };
  body: {
    choices: Array<Choice>;
    type: string;
    text: string;
    referenceId: string;
    imageURL: string;
    imageUri: string;
    imageHeight: number;
    imageWidth: number;
  };
  globalId: string;
}

export interface Avatar {
  name: string;
  URL: string;
  width: number;
  height: number;
  duration: number;
  data: object;
}

interface Choice {
  text: string;
  value: string;
  type: string;
  view: string;
  webUrl: string;
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

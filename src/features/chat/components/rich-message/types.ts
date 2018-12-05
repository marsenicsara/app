interface Header {
  editAllowed: boolean;
  statusMessage: string;
}

interface Body {
  text: string;
  key?: string;
  mimeType?: string;
}

interface Message {
  header: Header;
  body: Body;
}

export interface Props {
  message: Message;
  index: number;
  withMargin: boolean;
  fromUser: boolean;
}

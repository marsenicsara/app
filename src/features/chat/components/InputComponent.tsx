import * as React from 'react';

import ChatTextInput from '../containers/ChatTextInput';
import MultipleSelectInput from '../containers/MultipleSelectInput';
import SingleSelectInput from '../containers/SingleSelectInput';
import BankIdCollectInput from '../containers/BankIdCollectInput';
import AudioInput from '../containers/AudioInput';
import ParagraphInput from '../containers/ParagraphInput';

interface InputComponentProps {
  messages: any;
  showOffer: () => void;
}

interface InputComponentMapProps {
  message: any;
  showOffer: () => void;
}

const inputComponentMap: {
  [key: string]: React.SFC<InputComponentMapProps>;
} = {
  multiple_select: () => <MultipleSelectInput />,
  text: (props) => <ChatTextInput {...props} />,
  number: (props) => <ChatTextInput {...props} keyboardType="numeric" />,
  single_select: (props) => <SingleSelectInput {...props} />,
  bankid_collect: () => <BankIdCollectInput />,
  paragraph: () => <ParagraphInput />,
  audio: () => <AudioInput />,
};

const InputComponent: React.SFC<InputComponentProps> = (props) => {
  const { messages } = props;

  if (messages.length === 0) {
    return null;
  }

  const lastMessage = messages[0];
  const lastMessageType = lastMessage.body.type;

  const Component = inputComponentMap[lastMessageType];

  if (!Component) {
    return null;
  }

  return <Component {...props} message={lastMessage} />;
};

export default InputComponent;

import React from "react"
import { Link } from "react-router-dom"

import MessageList from "../containers/chat/MessageList"
import ChatNumberInput from "../containers/chat/ChatNumberInput"
import ChatTextInput from "../containers/chat/ChatTextInput"
import DateInput from "../containers/chat/DateInput"
import MultipleSelectInput from "../containers/chat/MultipleSelectInput"
import SingleSelectInput from "../containers/chat/SingleSelectInput"
import BankIdCollectInput from "../containers/chat/BankIdCollectInput"
import ParagraphInput from "../containers/chat/ParagraphInput"
import FileInput from "../containers/chat/FileInput"
import { Header } from "../components/Header"

import {
  ChatAreaStyled,
  MessageAreaStyled,
  InputAreaStyled
} from "./styles/chat"
import { ResetIconButton } from "./Button"
import { NavStyled } from "./styles/nav"
import { FullHeight } from "./styles/general"

const getInputComponent = function(messages) {
  if (messages.length === 0) {
    return null
  }
  let lastIndex = messages.length - 1
  let lastMessage = messages[lastIndex]
  let lastMessageType = lastMessage.body.type
  return {
    multiple_select: <MultipleSelectInput messageIndex={lastIndex} />,
    text: <ChatTextInput messageIndex={lastIndex} />,
    number: <ChatNumberInput messageIndex={lastIndex} />,
    single_select: <SingleSelectInput messageIndex={lastIndex} />,
    date_picker: <DateInput messageIndex={lastIndex} />,
    bankid_collect: <BankIdCollectInput messageIndex={lastIndex} />,
    paragraph: <ParagraphInput messageIndex={lastIndex} />,
    file: <FileInput messageIndex={lastIndex} />
  }[lastMessageType]
}

export default class Chat extends React.Component {
  componentDidMount() {
    this.props.getMessages()
  }

  render() {
    return (
      <FullHeight style={{ overflow: "hidden" }}>
        <Header
          headerRight={
            <ResetIconButton onClick={() => this.props.resetConversation()} />
          }
        />
        <ChatAreaStyled>
          <MessageAreaStyled>
            <MessageList />
          </MessageAreaStyled>

          <InputAreaStyled>
            {getInputComponent(this.props.messages)}
          </InputAreaStyled>
        </ChatAreaStyled>
      </FullHeight>
    )
  }
}
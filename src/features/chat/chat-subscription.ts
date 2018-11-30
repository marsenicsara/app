import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    currentChatResponse {
      globalId
      id
      body {
        ...SingleSelect
        ...MultipleSelect
        ...Text
        ...Number
        ...Audio
        ...BankIdCollect
        ...Paragraph
        ...File
        ...Undefined
      }
      header {
        ...Header
      }
    }
  }

  fragment Header on MessageHeader {
    messageId
    fromMyself
    timeStamp
    richTextChatCompatible
    editAllowed
    shouldRequestPushNotifications
  }

  fragment SingleSelect on MessageBodySingleSelect {
    type
    id
    text
    choices {
      ...ChoicesSelection
      ...ChoicesLink
      ...ChoicesUndefined
    }
  }

  fragment MultipleSelect on MessageBodySingleSelect {
    type
    id
    text
    choices {
      ...ChoicesSelection
      ...ChoicesLink
      ...ChoicesUndefined
    }
  }

  fragment Text on MessageBodyText {
    type
    id
    text
  }

  fragment Number on MessageBodyText {
    type
    id
    text
  }

  fragment Audio on MessageBodyAudio {
    type
    id
    text
    url
  }

  fragment BankIdCollect on MessageBodyBankIdCollect {
    type
    id
    text
    referenceId
  }

  fragment File on MessageBodyFile {
    type
    id
    text
    key
    mimeType
  }

  fragment Undefined on MessageBodyUndefined {
    type
    id
    text
  }

  fragment ChoicesSelection on MessageBodyChoicesSelection {
    type
    value
    text
    selected
  }

  fragment ChoicesLink on MessageBodyChoicesLink {
    type
    value
    text
    selected
    view
    appUrl
    webUrl
  }

  fragment ChoicesUndefined on MessageBodyChoicesUndefined {
    type
    value
    text
    selected
  }

  fragment Paragraph on MessageBodyParagraph {
    type
    id
    text
  }
`;

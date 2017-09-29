import { connect } from "react-redux"
import Chat from "../components/Chat"
import { mockChatActions, chatActions } from "hedvig-redux"

const mapStateToProps = state => {
  return {
    messages: state.chat.messages,
    numVisibleMessages: state.mockedChat.numVisibleMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMessages: () => dispatch(chatActions.getMessages()),
    displayNextMessage: () => dispatch(mockChatActions.displayNextMessage())
  }
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat)

export default ChatContainer

import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription newMessage {
    message {
      globalId
    }
  }
`;

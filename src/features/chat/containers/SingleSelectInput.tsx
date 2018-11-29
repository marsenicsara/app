import * as React from 'react';
import { Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Container, ActionMap } from 'constate';

import { AnimatedSingleSelectOptionButton } from '../components/Button';
import {
  StyledRightAlignedOptions,
  StyledMarginContainer,
} from '../styles/chat';

import { PAYMENT_SCREEN } from '../../../navigation/screens/payment';
import { getMainLayout } from 'src/navigation/layouts/mainLayout';
import { setLayout } from 'src/navigation/layouts/setLayout';

import { Message, Choice } from '../types';

import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const showTrustly = (id: any) =>
  Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            ...PAYMENT_SCREEN.component,
            passProps: {
              id,
              startedFromChat: true,
            },
          },
        },
      ],
    },
  });

const goToDashboard = () => {
  setLayout(getMainLayout());
};

const SEND_SINGLE_SELECT_CHOICE = gql`
  mutation sendSingleSelectChoice($input: ChatResponseSingleSelectInput) {
    sendChatSingleSelectResponse(input: $input)
  }
`;

interface SingleSelectInputProps {
  message: Message;
  showOffer: () => void;
  selectChoice: (message: Message, choice: Choice) => void;
}

const done = (message: Message) => {};

const SingleSelectInput: React.SFC<SingleSelectInputProps> = ({
  message,
  showOffer,
  selectChoice,
}) => {
  console.log(message);
  const anySelected = message.body.choices.some((choice) => choice.selected);
  return (
    <StyledMarginContainer>
      <Mutation mutation={SEND_SINGLE_SELECT_CHOICE}>
        {(send) => (
          <>
            {message.body.choices.map((choice) => (
              <StyledRightAlignedOptions key={choice.text}>
                <AnimatedSingleSelectOptionButton
                  hidden={anySelected && !choice.selected}
                  title={choice.text}
                  selected={choice.selected}
                  onPress={() => {
                    // send({ variables: { input: message } });

                    if (choice.type === 'selection') {
                      selectChoice(message, choice);
                      done(message);
                    } else if (choice.type === 'link' && choice.view !== null) {
                      selectChoice(message, choice);
                      done(message);
                      if (choice.view === 'Dashboard') {
                        goToDashboard();
                      } else if (choice.view === 'Offer') {
                        showOffer();
                      }
                    } else if (
                      choice.type === 'link' &&
                      choice.appUrl !== null
                    ) {
                      selectChoice(message, choice);
                      done(message);
                      Linking.openURL(choice.appUrl);
                    } else if (
                      choice.type === 'link' &&
                      choice.webUrl !== null
                    ) {
                      selectChoice(message, choice);
                      done(message);
                      Linking.openURL(choice.webUrl);
                    } else if (choice.type === 'trustly') {
                      showTrustly(choice.id);
                      selectChoice(message, choice);
                      done(message);
                    }
                  }}
                />
              </StyledRightAlignedOptions>
            ))}
          </>
        )}
      </Mutation>
    </StyledMarginContainer>
  );
};

export default SingleSelectInput;

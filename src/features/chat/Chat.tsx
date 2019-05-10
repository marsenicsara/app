import * as React from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, AppState, NativeModules, Platform } from 'react-native';
import styled from '@sampettersson/primitives';
import { Mount, Update, Unmount } from 'react-lifecycle-components';
import { Container, EffectMap, EffectProps } from 'constate';

import MessageList from './containers/MessageList';
import InputComponent from './components/InputComponent';
import { Loader } from '../../components/Loader';
import { chatActions, dialogActions } from '../../../hedvig-redux';
import * as selectors from './state/selectors';
import { NavigationOptions } from '../../navigation/options';
import { NavigationEvents } from 'src/navigation/events';
import { getMainLayout } from 'src/navigation/layouts/mainLayout';
import { setLayout } from 'src/navigation/layouts/setLayout';
import {
  RESTART_BUTTON,
  CLOSE_BUTTON,
  GO_TO_DASHBOARD_BUTTON,
  SHOW_OFFER_BUTTON,
} from '../../navigation/screens/chat/buttons';

import { Message } from './types';
import { KeyboardAvoidingOnAndroid } from 'src/components/KeyboardAvoidingOnAndroid';
import { NEW_OFFER_SCREEN } from 'src/navigation/screens/new-offer';
import { PixelRatio } from 'react-native';

import { colors } from '@hedviginsurance/brand';

interface ChatProps {
  onboardingDone: boolean;
  isModal: boolean;
  showReturnToOfferButton: boolean;
  componentId: string;
  intent: string;
  messages: Array<Message>;
  getAvatars: () => void;
  getMessages: (intent: string) => void;
  resetConversation: () => void;
}

interface State {
  longPollTimeout: number | null;
}

const initialState: State = {
  longPollTimeout: null,
};

interface Effects {
  startPolling: (getMessages: (intent: string) => void, intent: string) => void;
  stopPolling: () => void;
}

const effects: EffectMap<State, Effects> = {
  startPolling: (getMessages, intent) => ({
    setState,
    state,
  }: EffectProps<State>) => {
    if (!state.longPollTimeout) {
      setState(() => ({
        longPollTimeout: setInterval(() => {
          getMessages(intent);
        }, 15000),
      }));
    }
  },
  stopPolling: () => ({ setState, state }: EffectProps<State>) => {
    if (state.longPollTimeout) {
      clearInterval(state.longPollTimeout);
      setState(() => ({
        longPollTimeout: null,
      }));
    }
  },
};

const Messages = styled(View)({
  flex: 1,
  alignSelf: 'stretch',
});

const BackgroundView = styled(View)({
  backgroundColor: colors.OFF_WHITE,
  flex: 1,
});

const Response = styled(View)({
  alignItems: 'stretch',
  paddingTop: 0,
});

const getNavigationOptions = (
  onboardingDone: boolean,
  isModal: boolean,
  showReturnToOfferButton: boolean,
) => {
  if (onboardingDone) {
    if (isModal) {
      return {
        topBar: {
          leftButtons: [CLOSE_BUTTON],
          rightButtons: [],
        },
      };
    }

    return {
      topBar: {
        leftButtons: [GO_TO_DASHBOARD_BUTTON],
        rightButtons: [],
      },
    };
  } else if (showReturnToOfferButton) {
    return {
      topBar: {
        leftButtons: [],
        rightButtons: [SHOW_OFFER_BUTTON],
      },
    };
  } else {
    return {
      topBar: {
        leftButtons: [],
        rightButtons: [RESTART_BUTTON],
      },
    };
  }
};

const showOffer = async (componentId: string) => {
  if (Platform.OS === 'android') {
    NativeModules.ActivityStarter.navigateToOfferFromChat();
    return;
  }
  Navigation.push(componentId, NEW_OFFER_SCREEN);
};

const handleAppStateChange = (
  appState: string,
  getMessages: (intent: string) => void,
  intent: string,
) => {
  if (appState === 'active') {
    getMessages(intent);
  }
};

const KeyboardAvoidingOnAndroidIfModal: React.SFC<{ isModal: boolean }> = ({
  children,
  isModal,
}) =>
  isModal ? (
    <KeyboardAvoidingOnAndroid
      additionalPadding={PixelRatio.getPixelSizeForLayoutSize(14)}
    >
      {children}
    </KeyboardAvoidingOnAndroid>
  ) : (
    <>{children}</>
  );

const Chat: React.SFC<ChatProps> = ({
  onboardingDone = false,
  isModal,
  showReturnToOfferButton,
  componentId,
  intent,
  messages,
  getAvatars,
  getMessages,
  resetConversation,
}) => (
  <Container effects={effects} initialState={initialState}>
    {({ startPolling, stopPolling }) => (
      <BackgroundView>
        <NavigationEvents
          onNavigationButtonPressed={(event: any) => {
            if (event.buttonId === RESTART_BUTTON.id) {
              resetConversation();
            }

            if (event.buttonId === CLOSE_BUTTON.id) {
              Navigation.dismissModal(componentId);
            }

            if (event.buttonId === GO_TO_DASHBOARD_BUTTON.id) {
              setLayout(getMainLayout());
            }

            if (event.buttonId === SHOW_OFFER_BUTTON.id) {
              showOffer(componentId);
            }
          }}
        />
        <Mount
          on={() => {
            getMessages(intent);
            getAvatars();
            AppState.addEventListener('change', (appState) => {
              handleAppStateChange(appState, getMessages, intent);
            });
            startPolling(getMessages, intent);
          }}
        >
          {null}
        </Mount>
        <Update
          was={() => {
            startPolling(getMessages, intent);
          }}
          watched={messages}
        >
          {null}
        </Update>
        <Unmount
          on={() => {
            AppState.addEventListener('change', (appState) => {
              handleAppStateChange(appState, getMessages, intent);
            });
            stopPolling();
          }}
        >
          {null}
        </Unmount>
        <NavigationOptions
          options={getNavigationOptions(
            onboardingDone,
            isModal,
            showReturnToOfferButton,
          )}
        >
          <KeyboardAvoidingOnAndroidIfModal isModal={isModal}>
            <Messages>
              {messages.length ? (
                <MessageList componentId={componentId} />
              ) : (
                <Loader />
              )}
            </Messages>
            <Response>
              <InputComponent
                showOffer={() => showOffer(componentId)}
                messages={messages}
              />
            </Response>
          </KeyboardAvoidingOnAndroidIfModal>
        </NavigationOptions>
      </BackgroundView>
    )}
  </Container>
);

const mapStateToProps = (state: any) => {
  return {
    messages: state.chat.messages,
    showReturnToOfferButton: selectors.shouldShowReturnToOfferScreenButton(
      state,
    ),
    onboardingDone: selectors.isOnboardingDone(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getMessages: (intent: null | string) =>
      dispatch(
        chatActions.getMessages({
          intent,
        }),
      ),
    getAvatars: () => dispatch(chatActions.getAvatars()),
    resetConversation: () =>
      dispatch(
        dialogActions.showDialog({
          title: 'Vill du börja om?',
          paragraph:
            'Om du trycker ja så börjar\nkonversationen om från början',
          confirmButtonTitle: 'Ja',
          dismissButtonTitle: 'Nej',
          onConfirm: () => dispatch(chatActions.resetConversation()),
          onDismiss: () => {},
        }),
      ),
    editLastResponse: () => dispatch(chatActions.editLastResponse()),
  };
};

const ChatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default ChatContainer;
export { Chat as PureChat };

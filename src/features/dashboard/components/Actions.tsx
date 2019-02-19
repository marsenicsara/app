import * as React from 'react';
import styled from '@sampettersson/primitives';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { getFabActions } from '../state/selectors';

import { chatActions } from '../../../../hedvig-redux';

import { fonts, colors } from '@hedviginsurance/brand';
import { Mount } from 'react-lifecycle-components';
import { Loader } from 'src/components/Loader';

const InsetPadding = styled(View)({
  paddingLeft: 24,
  paddingRight: 24,
});

const ActionsTitle = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  color: colors.BLACK,
  fontWeight: '500',
});

const ActionsScrollView = styled(ScrollView)({
  paddingTop: 10,
  paddingBottom: 10,
});

const Action = styled(TouchableOpacity)({
  backgroundColor: colors.PURPLE,
  borderRadius: 30,
  padding: 10,
  paddingLeft: 15,
  paddingRight: 15,
  marginRight: 10,
});

const ActionText = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 14,
  color: colors.WHITE,
  fontWeight: '500',
});

const ActionsComponent = (props: any) => {
  if (Platform.OS === 'android') {
    return null;
  }

  return (
    <>
      <Mount
        on={() => {
          props.getMessages();
        }}
      >
        {null}
      </Mount>
      <InsetPadding>
        <ActionsTitle>Vad vill du göra idag?</ActionsTitle>
      </InsetPadding>
      <ActionsScrollView
        indicator
        showsHorizontalScrollIndicator={false}
        contentInset={{ left: 24, right: 24 }}
        horizontal
        contentOffset={{ x: -24, y: 0 }}
      >
        {(props.fabActions || []).map((action: any) => (
          <Action
            key={action.text}
            onPress={() => {
              const maybeBackendAction = props.fabActions.filter(
                (a: any) => a.triggerUrl === action.triggerUrl,
              );
              if (maybeBackendAction.length !== 1) {
                throw new Error(
                  `Mismatch in remote and local fabActions: ${JSON.stringify(
                    props.fabActions,
                  )}, url: ${action.triggerUrl}`,
                );
              }
              const backendAction = maybeBackendAction[0];
              if (backendAction.enabled === false) {
                return;
              }
              props.goToChat(action.triggerUrl);
            }}
          >
            <ActionText>{action.text}</ActionText>
          </Action>
        ))}
        {!props.fabActions && (
          <InsetPadding>
            <Loader />
          </InsetPadding>
        )}
      </ActionsScrollView>
    </>
  );
};

export const Actions = connect(
  (state) => ({
    fabActions: getFabActions(state),
  }),
  (dispatch) => ({
    goToChat: (url: any) =>
      dispatch(
        chatActions.apiAndNavigateToChat({
          method: 'POST',
          url,
          SUCCESS: 'INITIATED_CHAT_MAIN',
        }),
      ),
    getMessages: () => dispatch(chatActions.getMessages()),
  }),
)(ActionsComponent);

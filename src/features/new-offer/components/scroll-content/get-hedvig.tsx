import * as React from 'react';
import {
  Text,
  View,
  Animated,
  TextProps,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Container, ActionMap } from 'constate';
import { Store } from 'src/setupApp';
import { Mutation } from 'react-apollo';
import { Spacing } from 'src/components/Spacing';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { deleteToken } from 'src/graphql/context';
import { setLayout } from 'src/navigation/layouts/setLayout';
import gql from 'graphql-tag';
import { getChatLayout } from 'src/navigation/layouts/chatLayout';
import { chatActions } from 'hedvig-redux';

const AnimatedText = Animated.createAnimatedComponent<TextProps>(Text);

const CONTENT_INSET = isIphoneX() ? 75 : 0;

const Title = styled(AnimatedText)(
  ({
    scrollAnimatedValue,
    positionFromTop,
  }: {
    scrollAnimatedValue: Animated.Value;
    positionFromTop: number;
  }) => ({
    fontFamily: fonts.CIRCULAR,
    fontWeight: '800',
    color: colors.WHITE,
    fontSize: 25,
    opacity: scrollAnimatedValue.interpolate({
      inputRange: [
        positionFromTop - CONTENT_INSET,
        positionFromTop - CONTENT_INSET + 60,
      ],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }),
);

const Body = styled(AnimatedText)(
  ({
    scrollAnimatedValue,
    positionFromTop,
  }: {
    scrollAnimatedValue: Animated.Value;
    positionFromTop: number;
  }) => ({
    fontFamily: fonts.CIRCULAR,
    color: colors.WHITE,
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'center',
    opacity: scrollAnimatedValue.interpolate({
      inputRange: [
        positionFromTop - CONTENT_INSET,
        positionFromTop - CONTENT_INSET + 80,
      ],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  }),
);

const Block = styled(View)({
  padding: 20,
  paddingBottom: isIphoneX() ? 75 : 110,
  alignItems: 'center',
  backgroundColor: colors.BLACK_PURPLE,
});

const RestartButton = styled(TouchableOpacity)({
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 20,
  paddingRight: 20,
  marginTop: 10,
  marginBottom: 30,
  borderRadius: 20,
  backgroundColor: colors.WHITE,
});

interface State {
  positionFromTop: number;
}

interface Actions {
  setPositionFromTop: (positionFromTop: number) => void;
}

interface GetHedvigProps {
  scrollAnimatedValue: Animated.Value;
}

const actions: ActionMap<State, Actions> = {
  setPositionFromTop: (positionFromTop) => () => ({
    positionFromTop,
  }),
};

const LOGOUT_MUTATION = gql`
  mutation LogoutMutation {
    logout
  }
`;

export const GetHedvig: React.SFC<GetHedvigProps> = ({
  scrollAnimatedValue,
}) => (
  <Container actions={actions} initialState={{ positionFromTop: 0 }}>
    {({ positionFromTop, setPositionFromTop }) => (
      <View
        onLayout={(event) => setPositionFromTop(event.nativeEvent.layout.y)}
      >
        <Block>
          <Body
            scrollAnimatedValue={scrollAnimatedValue}
            positionFromTop={positionFromTop}
            style={{ color: colors.WHITE }}
          >
            Råkade du skriva fel?
          </Body>
          <Mutation mutation={LOGOUT_MUTATION}>
            {(logout, { client }) => (
              <RestartButton
                onPress={async () => {
                  chatActions.resetConversation();
                  await logout();
                  deleteToken();
                  Store.dispatch({ type: 'DELETE_TOKEN' });
                  Store.dispatch({ type: 'DELETE_TRACKING_ID' });
                  Store.dispatch({ type: 'AUTHENTICATE' });
                  await AsyncStorage.removeItem(
                    '@hedvig:alreadySeenMarketingCarousel',
                  );
                  await setLayout(getChatLayout());
                  setTimeout(() => {
                    client.resetStore();
                  }, 200);
                }}
              >
                <Text>Börja om</Text>
              </RestartButton>
            )}
          </Mutation>

          <TranslationsConsumer textKey="OFFER_GET_HEDVIG_TITLE">
            {(text) => (
              <Title
                scrollAnimatedValue={scrollAnimatedValue}
                positionFromTop={positionFromTop}
              >
                {text}
              </Title>
            )}
          </TranslationsConsumer>
          <Spacing height={15} />
          <TranslationsConsumer textKey="OFFER_GET_HEDVIG_BODY">
            {(text) => (
              <Body
                scrollAnimatedValue={scrollAnimatedValue}
                positionFromTop={positionFromTop}
              >
                {text}
              </Body>
            )}
          </TranslationsConsumer>
        </Block>
      </View>
    )}
  </Container>
);

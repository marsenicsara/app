import * as React from 'react';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Container } from 'constate';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';
import { format } from 'date-fns';
import { scheduleAnimation } from './ScheduleAnimation';
import { HeightConstraint } from './HeightConstraint';
import { Measure } from 'src/components/Measure';
import { Delay, Timing, Sequence } from 'animated-react-native-components';
import { AnimatedView } from 'src/components/AnimatedPrimitives';

const ExpandButton = styled(TouchableOpacity)(
  ({ visibleText }: { visibleText: boolean }) => ({
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: visibleText ? 24 : 0,
    marginBottom: 32,
    fontFamily: fonts.CIRCULAR,
    minWidth: 100,
  }),
);

const FadeIn = styled(AnimatedView)(
  ({ animatedValue }: { animatedValue: Animated.Value }) => ({
    opacity: animatedValue,
  }),
);
const ExpandButtonText = styled(Text)({
  color: colors.PURPLE,
  padding: 0,
  fontSize: 14,
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 0,
});

const InfoText = styled(Text)(({ height }: { height: number }) => ({
  textAlign: 'center',
  paddingLeft: 10,
  paddingRight: 10,
  marginBottom: 0,
  marginTop: 0,
  height: height ? height : 'auto',
  fontFamily: fonts.CIRCULAR,
}));

interface State {
  showingInfo: boolean;
  startingState: InsuranceStatus;
}
interface Actions {
  showMore: (showingInfo: boolean) => void;
}

interface Props {
  status: InsuranceStatus;
  activeFrom: string;
}

const textKeyValueMap = (status: string) => {
  switch (status) {
    case 'INACTIVE_WITH_START_DATE':
      return 'DASHBOARD_READMORE_HAVE_START_DATE_TEXT';
    case 'INACTIVE':
      return 'DASHBOARD_READMORE_NOT_STARTED_TEXT';
  }
  return '';
};

const swedishTranslate = (date: string) => {
  const day = format(date, 'D');
  const month = format(date, 'M');
  const year = format(date, 'YYYY');
  const swedishMonths = [
    ' Januari ',
    ' Februari ',
    ' Mars ',
    ' April ',
    ' Maj ',
    ' Juni ',
    ' Juli ',
    ' Augusti ',
    ' September ',
    ' Oktober ',
    ' November ',
    ' December ',
  ];
  return day + swedishMonths[Number(month) - 1] + year;
};

export const ReadMore: React.SFC<Props> = ({ status, activeFrom }) => (
  <Container<State, Actions>
    initialState={{ showingInfo: false }}
    actions={{
      showMore: (showingInfo: boolean) => () => ({
        showingInfo: showingInfo,
      }),
    }}
  >
    {(state) => (
      <>
        <Row>
          <HeightConstraint visible={state.showingInfo} useWidth={true}>
            <Sequence>
              <Timing
                initialValue={state.showingInfo === false ? 1 : 0}
                toValue={state.showingInfo === false ? 0 : 1}
                config={{ duration: 300 }}
              >
                {(animatedValue) => (
                  <FadeIn animatedValue={animatedValue}>
                    <Measure>
                      {(height) => (
                        <InfoText height={height}>
                          {status === 'INACTIVE_WITH_START_DATE' ? (
                            <TranslationsPlaceholderConsumer
                              textKey={textKeyValueMap(status)}
                              replacements={{
                                date: swedishTranslate(activeFrom),
                              }}
                            >
                              {(text) => text}
                            </TranslationsPlaceholderConsumer>
                          ) : status === 'INACTIVE' ? (
                            <TranslationsConsumer
                              textKey={textKeyValueMap(status)}
                            >
                              {(text) => text}
                            </TranslationsConsumer>
                          ) : null}
                        </InfoText>
                      )}
                    </Measure>
                  </FadeIn>
                )}
              </Timing>
            </Sequence>
          </HeightConstraint>
        </Row>
        <Row>
          <ExpandButton
            visibleText={state.showingInfo}
            onPress={() => {
              state.showMore(!state.showingInfo);
              scheduleAnimation(600);
            }}
          >
            <ExpandButtonText>
              <TranslationsConsumer
                textKey={
                  state.showingInfo
                    ? 'DASHBOARD_LESS_INFO_BUTTON_TEXT'
                    : 'DASHBOARD_MORE_INFO_BUTTON_TEXT'
                }
              >
                {(text) => text}
              </TranslationsConsumer>
            </ExpandButtonText>
          </ExpandButton>
        </Row>
      </>
    )}
  </Container>
);

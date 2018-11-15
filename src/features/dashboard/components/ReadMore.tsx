import * as React from 'react';
import { colors } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container } from 'constate';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';
import { format } from 'date-fns';
import { scheduleAnimation } from './ScheduleAnimation';
import { HeightConstraint } from './HeightConstraint';

const ExpandButton = styled(TouchableOpacity)(
  ({ visibleText }: { visibleText: boolean }) => ({
    alignItems: 'center',
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 50,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    marginTop: visibleText ? 24 : 0,
    marginBottom: 32,
  }),
);

const ExpandButtonText = styled(Text)({
  color: colors.PURPLE,
  padding: 0,
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 0,
});

const InfoText = styled(Text)({
  textAlign: 'center',
  paddingLeft: 25,
  paddingRight: 25,
  marginBottom: 0,
  marginTop: 0,
});

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
    case 'INACTIVE': //TODO: should use another PENDING status later
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
      showMore: (showingInfo) => () => ({
        showingInfo,
      }),
    }}
  >
    {(state) => (
      <>
        <Row>
          <HeightConstraint visible={state.showingInfo}>
            <InfoText>
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
                <TranslationsConsumer textKey={textKeyValueMap(status)}>
                  {(text) => text}
                </TranslationsConsumer>
              ) : null}
            </InfoText>
          </HeightConstraint>
        </Row>
        <Row>
          <ExpandButton
            visibleText={state.showingInfo}
            onPress={() => {
              state.showMore(!state.showingInfo);
              scheduleAnimation();
            }}
          >
            <ExpandButtonText>
              <TranslationsConsumer textKey="DASHBOARD_MORE_INFO_BUTTON_TEXT">
                {(text) => text}
              </TranslationsConsumer>
            </ExpandButtonText>
          </ExpandButton>
        </Row>
      </>
    )}
  </Container>
);

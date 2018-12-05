import * as React from 'react';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text } from 'react-native';
import {
  format,
  differenceInMonths,
  getDaysInMonth,
  differenceInDays,
} from 'date-fns';
import { ReadMore } from './ReadMore';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Container } from 'constate';
import { Mount, Unmount } from 'react-lifecycle-components';

interface Props {
  activeFrom: string;
  statusCode: InsuranceStatus;
}

const Wrapper = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
});

const Row = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 0,
});

const TimeRow = styled(View)({
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  alignContent: 'center',
  marginBottom: 16,
});

const ActivationText = styled(Text)(({ textColor }: { textColor: string }) => ({
  color: textColor,
  textAlign: 'center',
  fontSize: 16,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '100',
  marginBottom: 8,
  marginTop: 24,
}));

const CountNumber = styled(Text)(({ textColor }: { textColor: string }) => ({
  color: textColor,
  fontSize: 38,
  fontFamily: fonts.CIRCULAR,
  fontWeight: 'bold',
  paddingLeft: 5,
  paddingRight: 2,
  paddingTop: 0,
  paddingBottom: 0,
  maxHeight: '100%',
}));

const CountText = styled(Text)(({ textColor }: { textColor: string }) => ({
  color: textColor,
  fontSize: 12,
  fontFamily: fonts.CIRCULAR,
  paddingRight: 5,
  paddingLeft: 2,
  opacity: 0.7,
  padding: 0,
  maxHeight: '100%',
}));

const getActivationMonths = (activeFrom: string) => {
  const now = new Date();
  const today = format(now, 'YYYY-MM-DD');
  const startDate = format(activeFrom, 'YYYY-MM-DD');
  return differenceInMonths(startDate, today);
};

const getActivationDays = (activeFrom: string) => {
  const now = new Date();
  const today = format(now, 'YYYY-MM-DD');
  const startDate = format(activeFrom, 'YYYY-MM-DD');
  let totalDays = differenceInDays(startDate, today);
  for (let i = 1; i === differenceInMonths(startDate, today); i++) {
    totalDays -= getDaysInMonth(new Date(i));
  }
  return totalDays - 1;
};

const getActivationHours = () => {
  const now = new Date();
  const nowFormat = format(now, 'H');
  return 24 - 1 - Number(nowFormat);
};

const getActivationMinutes = () => {
  const now = new Date();
  const nowFormat = format(now, 'm');
  return 60 - 1 - Number(nowFormat);
};

interface State {
  monthsToActivation: number;
  daysToActivation: number;
  hoursToActivation: number;
  minutesToActivation: number;
  timerID: number;
}

interface Actions {
  updateMonths: (months: number) => number;
  updateDays: (days: number) => number;
  updateHours: (hours: number) => number;
  updateMinutes: (minutes: number) => number;
  updateTimerID: (timerID: number) => number;
}

export const DateBanner: React.SFC<Props> = ({ activeFrom, statusCode }) => (
  <Container<State, Actions>
    initialState={{
      monthsToActivation: 0,
      daysToActivation: 0,
      hoursToActivation: 0,
      minutesToActivation: 0,
    }}
    actions={{
      updateMonths: (months: number) => () => ({
        monthsToActivation: months,
      }),
      updateDays: (days: number) => () => ({
        daysToActivation: days,
      }),
      updateHours: (hours: number) => () => ({
        hoursToActivation: hours,
      }),
      updateMinutes: (minutes: number) => () => ({
        minutesToActivation: minutes,
      }),
      updateTimerID: (timerID: number) => () => ({
        timerID: timerID,
      }),
    }}
  >
    {(state) => (
      <Wrapper>
        <Mount
          on={() => {
            let timer = setInterval(() => {
              state.updateMonths(getActivationMonths(activeFrom));
              state.updateDays(getActivationDays(activeFrom));
              state.updateHours(getActivationHours());
              state.updateMinutes(getActivationMinutes());
            }, 1000);
            state.updateTimerID(timer);
          }}
        >
          <Row>
            <ActivationText textColor={colors.BLACK}>
              <TranslationsConsumer textKey="DASHBOARD_HAVE_START_DATE_BANNER_TITLE">
                {(text) => text}
              </TranslationsConsumer>
            </ActivationText>
          </Row>
          <TimeRow>
            <CountNumber textColor={colors.BLACK_PURPLE}>
              {state.monthsToActivation}
            </CountNumber>
            <CountText textColor={colors.BLACK_PURPLE}>
              <TranslationsConsumer textKey="DASHBOARD_BANNER_MONTHS">
                {(text) => text}
              </TranslationsConsumer>
            </CountText>
            <CountNumber textColor={colors.PINK}>
              {state.daysToActivation}
            </CountNumber>
            <CountText textColor={colors.PINK}>
              <TranslationsConsumer textKey="DASHBOARD_BANNER_DAYS">
                {(text) => text}
              </TranslationsConsumer>
            </CountText>
            <CountNumber textColor={colors.PURPLE}>
              {state.hoursToActivation}
            </CountNumber>
            <CountText textColor={colors.PURPLE}>
              <TranslationsConsumer textKey="DASHBOARD_BANNER_HOURS">
                {(text) => text}
              </TranslationsConsumer>
            </CountText>
            <CountNumber textColor={colors.GREEN}>
              {state.minutesToActivation}
            </CountNumber>
            <CountText textColor={colors.GREEN}>
              <TranslationsConsumer textKey="DASHBOARD_BANNER_MINUTES">
                {(text) => text}
              </TranslationsConsumer>
            </CountText>
          </TimeRow>
          <ReadMore status={statusCode} activeFrom={activeFrom} />
        </Mount>
        <Unmount
          on={() => {
            clearInterval(state.timerID);
          }}
        >
          {null}
        </Unmount>
      </Wrapper>
    )}
  </Container>
);

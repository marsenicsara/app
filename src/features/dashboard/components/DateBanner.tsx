import * as React from 'react';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text } from 'react-native';
import { ReadMore } from './ReadMore';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { Container } from 'constate';
import { Mount, Unmount } from 'react-lifecycle-components';
import {
  differenceInMinutes,
  eachDay,
  getMonth,
  getDaysInMonth,
} from 'date-fns';

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

const getActivationFigures = (startDate: Date) => {
  const now = new Date();

  let daysBetweenDates = eachDay(now, startDate);
  let totalMinutes = differenceInMinutes(startDate, now);

  let daysPerMonth: { [key: number]: number } = {};

  daysBetweenDates.forEach((day) => {
    let month = getMonth(day);

    if (daysPerMonth[month]) {
      daysPerMonth[month] = daysPerMonth[month] + 1;
    } else {
      daysPerMonth[month] = 1;
    }
  });

  let minutesForMonths = 0;
  let actualMonths = 0;

  Object.keys(daysPerMonth).forEach((key) => {
    if (getDaysInMonth(key) == daysPerMonth[parseInt(key)]) {
      actualMonths = actualMonths + 1;
      minutesForMonths = minutesForMonths + daysPerMonth[parseInt(key)] * 1440;
    }
  });

  totalMinutes -= minutesForMonths;

  let days = totalMinutes / 1440;
  let actualDays = Math.floor(days);

  totalMinutes -= actualDays * 1440;

  let hours = totalMinutes / 60;
  let actualHours = Math.floor(hours);

  totalMinutes -= actualHours * 60;

  let actualMinutes = totalMinutes;

  return {
    months: actualMonths,
    days: actualDays,
    hours: actualHours,
    minutes: actualMinutes,
  };
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
              let { months, days, hours, minutes } = getActivationFigures(
                new Date(activeFrom),
              );

              state.updateMonths(months);
              state.updateDays(days);
              state.updateHours(hours);
              state.updateMinutes(minutes);
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

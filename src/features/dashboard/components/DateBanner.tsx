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
  hoursToActivation: number;
  minutesToActivation: number;
}

interface Actions {
  updateHours: (hours: number) => void;
  updateMinutes: (minutes: number) => void;
}

interface Effects {
  pollMinutes: () => void;
  pollHours: () => void;
}

export const DateBanner: React.SFC<Props> = ({ activeFrom, statusCode }) => (
  <Container<State, Actions, Effects>
    initialState={{ minutesToActivation: 0 }}
    actions={{
      updateMinutes: (minutes: number) => () => ({
        minutesToActivation: minutes,
      }),
      updateHours: (hours: number) => () => ({
        hoursToActivation: hours,
      }),
    }}
    effects={{
      pollMinutes: setInterval(() => {
        getActivationMinutes();
      }, 1000),
      pollHours: setInterval(() => {
        getActivationMinutes();
      }, 1000),
    }}
  >
    {(state) => (
      <Wrapper>
        <Row>
          <ActivationText textColor={colors.BLACK}>
            <TranslationsConsumer textKey="DASHBOARD_HAVE_START_DATE_BANNER_TITLE">
              {(text) => text}
            </TranslationsConsumer>
          </ActivationText>
        </Row>
        <TimeRow>
          <CountNumber textColor={colors.BLACK_PURPLE}>
            {getActivationMonths(activeFrom)}
          </CountNumber>
          <CountText textColor={colors.BLACK_PURPLE}>
            <TranslationsConsumer textKey="DASHBOARD_BANNER_MONTHS">
              {(text) => text}
            </TranslationsConsumer>
          </CountText>
          <CountNumber textColor={colors.PINK}>
            {getActivationDays(activeFrom)}
          </CountNumber>
          <CountText textColor={colors.PINK}>
            <TranslationsConsumer textKey="DASHBOARD_BANNER_DAYS">
              {(text) => text}
            </TranslationsConsumer>
          </CountText>
          <CountNumber textColor={colors.PURPLE}>
            {getActivationHours()}
          </CountNumber>
          <CountText textColor={colors.PURPLE}>
            <TranslationsConsumer textKey="DASHBOARD_BANNER_HOURS">
              {(text) => text}
            </TranslationsConsumer>
          </CountText>
          <CountNumber textColor={colors.GREEN}>
            {setInterval(() => {
              getActivationMinutes();
            }, 60 * 1000)}
          </CountNumber>
          <CountText textColor={colors.GREEN}>
            <TranslationsConsumer textKey="DASHBOARD_BANNER_MINUTES">
              {(text) => text}
            </TranslationsConsumer>
          </CountText>
        </TimeRow>
        <ReadMore status={statusCode} activeFrom={activeFrom} />
      </Wrapper>
    )}
  </Container>
);

import * as React from 'react';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, fonts } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text } from 'react-native';
import { format, differenceInMonths, differenceInDays } from 'date-fns';
import { ReadMore } from './ReadMore';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';

interface Props {
  activeFrom: string;
  statusCode: InsuranceStatus;
}

const Wrapper = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: -getStatusBarHeight() - 15,
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
  marginBottom: 27,
});

const ActivationText = styled(Text)(({ textColor }: { textColor: string }) => ({
  color: textColor,
  textAlign: 'center',
  fontSize: 16,
  fontFamily: fonts.CIRCULAR,
  fontWeight: '100',
  marginBottom: 8,
  marginTop: 66,
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
  const nowFormat = format(now, 'YYYY-MM-DD');
  const startDate = format(activeFrom, 'YYYY-MM-DD');
  return differenceInDays(startDate, nowFormat) - 1;
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

export const DateBanner: React.SFC<Props> = ({ activeFrom, statusCode }) => (
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
        {getActivationMinutes()}
      </CountNumber>
      <CountText textColor={colors.GREEN}>
        <TranslationsConsumer textKey="DASHBOARD_BANNER_MINUTES">
          {(text) => text}
        </TranslationsConsumer>
      </CountText>
    </TimeRow>
    <ReadMore status={statusCode} activeFrom={activeFrom} />
  </Wrapper>
);

import * as React from 'react';
import { colors } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { ActionMap, Container } from 'constate';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';
import { TranslationsPlaceholderConsumer } from 'src/components/translations/placeholder-consumer';
import { format } from 'date-fns';
import { AnimationVisibility } from './AnimationVisibility';

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

const scheduleAnimation = () => {
  LayoutAnimation.configureNext({
    duration: 600,
    create: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
    delete: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
      property: LayoutAnimation.Properties.scaleXY,
    },
  });
};

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

const swedishFormat = (date: string) => {
  const day = format(date, 'D');
  const month = format(date, 'M');
  const year = format(date, 'YYYY');
  let monthInSwedish = '';

  switch (month) {
    case '1':
      monthInSwedish = ' Januari ';
      break;
    case '2':
      monthInSwedish = ' Februari ';
      break;
    case '3':
      monthInSwedish = ' Mars ';
      break;
    case '4':
      monthInSwedish = ' April ';
      break;
    case '5':
      monthInSwedish = ' Maj ';
      break;
    case '6':
      monthInSwedish = ' Juni ';
      break;
    case '7':
      monthInSwedish = ' Juli ';
      break;
    case '8':
      monthInSwedish = ' Augusti ';
      break;
    case '9':
      monthInSwedish = ' September ';
      break;
    case '10':
      monthInSwedish = ' Oktober ';
      break;
    case '11':
      monthInSwedish = ' November ';
      break;
    case '12':
      monthInSwedish = ' December ';
      break;
  }
  return day + monthInSwedish + year;
};

export const ReadMore: React.SFC<Props> = ({ status, activeFrom }) => (
  <Container<State, ActionMap<State, Actions>>
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
          <AnimationVisibility visible={state.showingInfo}>
            <InfoText>
              {status === 'INACTIVE_WITH_START_DATE' ? (
                <TranslationsPlaceholderConsumer
                  textKey={textKeyValueMap(status)}
                  replacements={{
                    date: swedishFormat(activeFrom),
                  }}
                >
                  {(text) => text}
                </TranslationsPlaceholderConsumer>
              ) : status === 'INACTIVE_WITH_START_DATE' ? (
                <TranslationsConsumer textKey={textKeyValueMap(status)}>
                  {(text) => text}
                </TranslationsConsumer>
              ) : null}
            </InfoText>
          </AnimationVisibility>
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

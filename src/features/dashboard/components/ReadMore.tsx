import * as React from 'react';
import { colors } from '@hedviginsurance/brand';
import styled from '@sampettersson/primitives';
import { View, Text, TouchableOpacity, LayoutAnimation } from 'react-native';
import { ActionMap, Container } from 'constate';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';

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

const HeightConstraint = styled(View)(({ visible }: { visible: boolean }) => ({
  maxHeight: visible ? Number.MAX_SAFE_INTEGER : 0,
  overflow: 'hidden',
}));

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
  marginLeft: 10,
  marginRight: 10,
  paddingLeft: 10,
  paddingRight: 10,
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
}

const textKeyValueMap = (status: string) => {
  switch (status) {
    case 'ACTIVE':
      return 'DASHBOARD_READMORE_ACTIVE_TEXT';
    case 'INACTIVE_WITH_START_DATE':
      return 'DASHBOARD_READMORE_HAVE_START_DATE_TEXT';
    case 'INACTIVE': //should use another PENDING status later
      return 'DASHBOARD_READMORE_NOT_STARTED_TEXT';
  }
  return 'No text found';
};

export const ReadMore: React.SFC<Props> = ({ status }) => (
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
          <HeightConstraint visible={state.showingInfo}>
            <InfoText>
              <TranslationsConsumer textKey={textKeyValueMap(status)}>
                {(text) => text}
              </TranslationsConsumer>
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
            <ExpandButtonText>Mer info</ExpandButtonText>
          </ExpandButton>
        </Row>
      </>
    )}
  </Container>
);

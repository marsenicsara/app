import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@sampettersson/primitives';
import { ScrollView, View, Text } from 'react-native';

import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Loader } from 'src/components/Loader';
import { colors, fonts } from '@hedviginsurance/brand';
import { Spacing } from 'src/components/Spacing';
import { InsuranceStatusDisplay } from './components/InsuranceStatus';
import { PerilCategories } from './components/PerilCategories';
import { DeductibleFootnote } from './components/DeductibleFootnote';
import { OwnerFootnote } from './components/OwnerFootnote';
import { InsuranceAmountFootnote } from './components/InsuranceAmountFootnote';
import { TravelFootnote } from './components/TravelFootnote';
import { Messages } from './components/messages';
import { DateBanner } from './components/DateBanner';
import { PendingBanner } from 'src/features/dashboard/components/PendingBanner';
import { InsuranceStatus } from 'src/graphql/components';
import { TranslationsConsumer } from 'src/components/translations/consumer';

const DASHBOARD_QUERY = gql`
  query DashboardQuery {
    insurance {
      status
      type
      activeFrom

      perilCategories {
        title
        description
        iconUrl

        perils {
          id
          title
          imageUrl
          description
        }
      }
    }
  }
`;

const Container = styled(ScrollView)({
  flex: 1,
  backgroundColor: colors.OFF_WHITE,
});

const InsetPadding = styled(View)({
  paddingLeft: 24,
  paddingRight: 24,
});

const Header = styled(View)({
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: colors.WHITE,
  top: -getStatusBarHeight(),
  paddingLeft: 24,
  shadowOpacity: 0.1,
  shadowRadius: 2,
  shadowOffset: { width: 0, height: 1 },
  elevation: 1,
});

const Heading = styled(Text)({
  fontFamily: fonts.SORAY,
  color: colors.OFF_BLACK,
  fontSize: 30,
  marginTop: 83,
  marginBottom: 5,
});

const getStartDate = (statusCode: InsuranceStatus) => {
  switch (statusCode) {
    case 'ACTIVE':
      return 0;
    case 'INACTIVE_WITH_START_DATE':
      return 1;
    case 'INACTIVE': //should use another PENDING status later
      return 2;
  }
};

const Dashboard: React.SFC = () => (
  <Query query={DASHBOARD_QUERY}>
    {({ loading, error, data }) => {
      if (loading || !data) {
        return <Loader />;
      }

      if (error) {
        throw new Error(
          `error when fetching data: ${JSON.stringify(error, null, 2)}`,
        );
      }

      const { insurance } = data;
      const { status, activeFrom, type, perilCategories } = insurance;

      return (
        <Container contentContainerStyle={{ paddingBottom: 50 }}>
          {getStartDate(status) === 0 && (
            <Header>
              <Heading>
                <TranslationsConsumer textKey="replacementconsumerhere">
                  {(text) => text}
                </TranslationsConsumer>
              </Heading>
              <InsuranceStatusDisplay />
              <Spacing height={37} />
            </Header>
          )}
          <Messages />
          <InsetPadding>
            {getStartDate(status) === 1 ? (
              <DateBanner activeFrom={activeFrom} statusCode={status} />
            ) : getStartDate(status) === 2 ? (
              <PendingBanner statusCode={status} />
            ) : null}
          </InsetPadding>
          <InsetPadding>
            <PerilCategories perilCategories={perilCategories} />
          </InsetPadding>
          <Spacing height={24} />
          <InsetPadding>
            <DeductibleFootnote />
            <OwnerFootnote type={type} />
          </InsetPadding>
          <Spacing height={16} />
          <InsetPadding>
            <InsuranceAmountFootnote type={type} />
          </InsetPadding>
          <Spacing height={16} />
          <InsetPadding>
            <TravelFootnote />
          </InsetPadding>
        </Container>
      );
    }}
  </Query>
);

export { Dashboard };

import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@sampettersson/primitives';
import {
  ScrollView,
  View,
  Text,
} from 'react-native';

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
import { Actions } from './components/Actions';

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
    member {
      firstName
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

const CoverageTitle = styled(Text)({
  fontFamily: fonts.CIRCULAR,
  fontSize: 16,
  color: colors.BLACK,
  fontWeight: '500',
});

const getStartDate = (statusCode: InsuranceStatus) => {
  switch (statusCode) {
    case 'ACTIVE':
      return 0;
    case 'INACTIVE_WITH_START_DATE':
      return 1;
    case 'INACTIVE':
      return 2;
    case 'TERMINATED':
      return 3;
  }
};

interface ScreenProps {
  componentId: string;
}

const Dashboard: React.SFC<ScreenProps> = ({ componentId }) => (
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
          <Messages />
          {getStartDate(status) === 0 ? (
            <InsuranceStatusDisplay active={true} />
          ) : getStartDate(status) === 3 ? (
            <InsuranceStatusDisplay active={false} />
          ) : null}
          <InsetPadding>
            {getStartDate(status) === 1 ? (
              <DateBanner activeFrom={activeFrom} statusCode={status} />
            ) : getStartDate(status) === 2 ? (
              <PendingBanner activeFrom={activeFrom} statusCode={status} />
            ) : null}
          </InsetPadding>
          <Spacing height={16} />
          <Actions />
          <Spacing height={16} />
          <InsetPadding>
            <CoverageTitle>Ditt skydd</CoverageTitle>
          </InsetPadding>
          <Spacing height={10} />
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

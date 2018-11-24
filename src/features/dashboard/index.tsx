import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from '@sampettersson/primitives';
import { ScrollView, View, Text, TouchableWithoutFeedback } from 'react-native';

import { Loader } from 'src/components/Loader';
import { colors, fonts } from '@hedviginsurance/brand';
import { Spacing } from 'src/components/Spacing';
import { InsuranceStatusDisplay } from 'src/features/dashboard/components/InsuranceStatus';
import { PerilCategories } from 'src/features/dashboard/components/PerilCategories';
import { DeductibleFootnote } from 'src/features/dashboard/components/DeductibleFootnote';
import { OwnerFootnote } from 'src/features/dashboard/components/OwnerFootnote';
import { InsuranceAmountFootnote } from 'src/features/dashboard/components/InsuranceAmountFootnote';
import { TravelFootnote } from 'src/features/dashboard/components/TravelFootnote';
import { Messages } from 'src/features/dashboard/components/messages';
import { DebugShortcut } from 'src/components/DebugShortcut';

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
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Heading = styled(Text)({
  fontFamily: fonts.MERRIWEATHER,
  color: colors.OFF_BLACK,
  fontSize: 16,
});

interface ScreenProps {
  componentId: string
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
          <Spacing height={24} />
          <InsetPadding>
            <Header>
              <DebugShortcut componentId={componentId}>
                <Heading>Min hemförsäkring</Heading>
              </DebugShortcut>
              <InsuranceStatusDisplay status={status} activeFrom={activeFrom} />
            </Header>
          </InsetPadding>
          <Messages />
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

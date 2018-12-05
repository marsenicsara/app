import * as React from 'react';
import { QueryResult } from 'react-apollo';

import { OfferPerilsComponent, OfferPerilsQuery } from 'src/graphql/components';

interface PerilsQueryProps {
  children: (result: QueryResult<OfferPerilsQuery>) => React.ReactNode;
}

export const PerilsQuery: React.SFC<PerilsQueryProps> = ({ children }) => (
  <OfferPerilsComponent>{children}</OfferPerilsComponent>
);
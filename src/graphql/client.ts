import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

import { link } from './link';
import fm from './fragment-matcher';

const cache = new InMemoryCache({
  fragmentMatcher: fm,
  dataIdFromObject: (o) =>
    o.globalId ? `${o.__typename}:${o.globalId}` : null,
});

const stateLink = withClientState({
  cache,
  resolvers: {},
});

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, link]),
});

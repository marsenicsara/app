import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { link } from './link';
import fm from './fragment-matcher';

export const client = new ApolloClient({
  cache: new InMemoryCache({
    fragmentMatcher: fm,
  }),
  link,
});

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { link } from './link';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

import { ApolloClient, InMemoryCache } from '@apollo/client';

// replace localhost with your local IP
export const requestUri = 'http://localhost:9002/graphql';

const apolloClient = new ApolloClient({
  uri: requestUri,
  cache: new InMemoryCache(),
});

export default apolloClient;

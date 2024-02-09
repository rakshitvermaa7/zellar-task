import { ApolloClient, InMemoryCache } from '@apollo/client';

// replace localhost with your local IP
export const requestUri = 'http://192.168.1.42:9002/graphql';

const apolloClient = new ApolloClient({
  uri: requestUri,
  cache: new InMemoryCache(),
});

export default apolloClient;

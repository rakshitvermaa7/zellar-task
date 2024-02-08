import React from 'react';
import RootNavigator from '@navigators/RootNavigator';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@lib/apolloClient';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <PaperProvider>
      <ApolloProvider client={apolloClient}>
        <RootNavigator />
      </ApolloProvider>
    </PaperProvider>
  );
};

export default App;

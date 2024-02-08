import { CodegenConfig } from '@graphql-codegen/cli';
import { requestUri } from './src/lib/apolloClient';

const config: CodegenConfig = {
  overwrite: true,
  schema: requestUri,
  documents: ['src/graphql/*.graphql'],
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
  ignoreNoDocuments: true,
};

export default config;

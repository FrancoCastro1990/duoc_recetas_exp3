import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

/**
 * Apollo Client Configuration
 * Centralized configuration for GraphQL queries and mutations
 * Works alongside React Query for REST endpoints
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Configure caching behavior for specific queries if needed
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      // Data remains fresh for 5 minutes (matching React Query config)
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * MSW Request Handlers
 * Combines all domain-specific handlers into a single array
 * Supports both REST (http) and GraphQL (graphql) handlers
 */

import { recipesRestHandlers } from './recipes-rest';
import { recipesGraphQLHandlers } from './recipes-graphql';

export const handlers = [
  ...recipesRestHandlers,
  ...recipesGraphQLHandlers,
];

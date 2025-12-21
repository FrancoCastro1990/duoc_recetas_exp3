/**
 * MSW Request Handlers
 * Combines all domain-specific handlers into a single array
 * Supports both REST (http) and GraphQL (graphql) handlers
 */

import { vetRestHandlers } from './vet-rest';
import { vetGraphQLHandlers } from './vet-graphql';

export const handlers = [...vetRestHandlers, ...vetGraphQLHandlers];

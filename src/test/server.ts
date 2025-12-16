/**
 * MSW Server for Testing
 * Uses the same handlers as the browser mock but with setupServer for Node environment
 */
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'

export const server = setupServer(...handlers)

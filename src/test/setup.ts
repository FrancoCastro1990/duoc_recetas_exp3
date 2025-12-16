/**
 * Vitest Setup File
 * Configures testing environment with RTL matchers and MSW
 */
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'bypass' })
})

// Reset handlers after each test (important for test isolation)
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// Close MSW server after all tests
afterAll(() => {
  server.close()
})

import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { useRecipeDetail } from './useRecipeDetail'
import type { ReactNode } from 'react'

// Create a mock Apollo Client for testing with HttpLink
const createMockApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: '/graphql'
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache'
      },
      query: {
        fetchPolicy: 'no-cache'
      }
    }
  })
}

const createWrapper = (client: ApolloClient<unknown>) => {
  return ({ children }: { children: ReactNode }) => (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}

describe('useRecipeDetail', () => {
  it('skips query when id is empty string', () => {
    const client = createMockApolloClient()

    const { result } = renderHook(() => useRecipeDetail(''), {
      wrapper: createWrapper(client)
    })

    // When skip is true, loading should be false and no query is made
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('returns loading true initially when id is provided', () => {
    const client = createMockApolloClient()

    const { result } = renderHook(() => useRecipeDetail('1'), {
      wrapper: createWrapper(client)
    })

    // Initial state should be loading when query is initiated
    expect(result.current.loading).toBe(true)
  })

  it('does not skip query when valid id is provided', () => {
    const client = createMockApolloClient()

    const { result } = renderHook(() => useRecipeDetail('recipe-1'), {
      wrapper: createWrapper(client)
    })

    // When id is provided, loading should be true (query is running) or data should exist
    // Unlike when skip is true where loading is false
    expect(result.current.loading || result.current.data !== undefined).toBe(true)
  })

  it('uses correct variables', () => {
    const client = createMockApolloClient()

    const { result } = renderHook(() => useRecipeDetail('test-id-123'), {
      wrapper: createWrapper(client)
    })

    // The hook should be called with the correct id variable
    expect(result.current.variables).toEqual({ id: 'test-id-123' })
  })
})
